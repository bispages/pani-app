import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  RefObject,
} from 'react';
import { Text, View, Keyboard, Pressable, ImageBackground } from 'react-native';
import {
  TextInput,
  Button,
  Chip,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './User.style';
import {
  PROFESSIONNUMBER,
  USERTYPE_USER,
  USERTYPE_SHOP,
  USERFORM_BOTSHEET_SNAPMAX,
  USERFORM_BOTSHEET_SNAPMID,
  USERFORM_BOTSHEET_SNAPMIN,
} from '../../utils/constants';
import useBackHandler from '../../hooks/useBackHandler';
import { professionList } from '../../utils/professionList';
import { categoryList } from '../../utils/categoryList';

export type ItemList = {
  id: string;
  name: string;
  selected?: boolean;
};

const UserForm = () => {
  const { appColors } = useTheme();
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [userType, setUserType] = useState(USERTYPE_USER);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [selectedItems, setSelectedItems] = useState<ItemList[]>([]);
  const [dataList, setDataList] = useState(professionList);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const bottomSheet = useRef<BottomSheet>(null);
  const photoBottomSheet = useRef<BottomSheet>(null);

  const snapPoints = useMemo(
    () => [
      -1,
      USERFORM_BOTSHEET_SNAPMIN,
      USERFORM_BOTSHEET_SNAPMID,
      USERFORM_BOTSHEET_SNAPMAX,
    ],
    [],
  );
  const handleSheetChanges = useCallback(
    (index: number, sheet: RefObject<BottomSheet>) => {
      if (index <= 0) {
        sheet.current?.close();
        setIsBotSheetActive(false);
      } else {
        setIsBotSheetActive(true);
      }
    },
    [isBotSheetActive],
  );

  const showBotSheet = useCallback(
    (sheet: RefObject<BottomSheet>) => sheet.current?.snapTo(2),
    [],
  );

  const closeBotSheet = useCallback(
    (sheet: RefObject<BottomSheet>) => sheet.current?.close(),
    [],
  );

  const backAction = useCallback(() => {
    if (isBotSheetActive) {
      closeBotSheet(bottomSheet);
      closeBotSheet(photoBottomSheet);
      return true;
    }
    return false;
  }, [isBotSheetActive]);

  // Adds hardware BackHandler hook.
  useBackHandler(backAction);

  const keyboardDidHide = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    // Keyboard events.
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const onDismissSnackBar = () => {
    setShowSnack(false);
    setMessage('');
  };

  useEffect(() => {
    const list = userType === USERTYPE_USER ? professionList : categoryList;
    setDataList(list);
    setSelectedItems([]);
  }, [userType]);

  useEffect(() => {
    if (pincode.length >= 6) Keyboard.dismiss();
    setSaveDisabled(!(name && pincode && selectedItems.length > 0));
  }, [name, pincode, selectedItems]);

  const saveDetails = () => {
    const payload = { name, pincode, userType, category: selectedItems };
  };

  const updateSelectedItems = (item: ItemList, index: number) => {
    if (
      selectedItems.length <= PROFESSIONNUMBER - 1 ||
      (item.selected !== undefined && item.selected)
    ) {
      let itemsSelectedList: ItemList[] = [];
      let currentItem = {} as ItemList;
      if (item.selected === undefined || !item.selected) {
        currentItem = { ...item, selected: true };
        itemsSelectedList = [currentItem, ...selectedItems];
      } else {
        currentItem = { ...item, selected: false };
        itemsSelectedList = selectedItems.filter(
          (selectedItem: ItemList) => item.id !== selectedItem.id,
        );
      }
      const newDataList = dataList.slice();
      newDataList[index] = currentItem;
      setSelectedItems(itemsSelectedList);
      setDataList(newDataList);
    } else {
      setMessage(`Can't add more`);
      setShowSnack(true);
    }
  };

  const renderBottomSheet = () => (
    <BottomSheet
      ref={bottomSheet}
      index={-1}
      snapPoints={snapPoints}
      onChange={(index: number) => handleSheetChanges(index, bottomSheet)}>
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        persistentScrollbar
        removeClippedSubviews>
        {dataList.map((item: ItemList, index: number) => {
          return (
            <Chip
              key={item.id}
              icon={
                userType === USERTYPE_SHOP
                  ? 'store-outline'
                  : 'account-circle-outline'
              }
              style={
                item.selected
                  ? [
                      styles.dataListChip,
                      {
                        backgroundColor: appColors.secondary,
                      },
                    ]
                  : [
                      styles.dataListChip,
                      {
                        borderWidth: 1,
                        borderColor: appColors.greyfriendTwo,
                      },
                    ]
              }
              textStyle={
                item.selected
                  ? { color: appColors.white }
                  : { color: appColors.primary }
              }
              selected={item?.selected ?? false}
              selectedColor={
                item.selected ? appColors.white : appColors.primary
              }
              onPress={() => updateSelectedItems({ ...item }, index)}>
              {item.name}
            </Chip>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 120,
      compressImageMaxHeight: 120,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setImage(image.path);
      closeBotSheet(photoBottomSheet);
    });
    // .catch(err => console.log(err));
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 120,
      height: 120,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      cropperActiveWidgetColor: appColors.secondary,
    }).then(image => {
      setImage(image.path);
      closeBotSheet(photoBottomSheet);
    });
    // .catch(err => console.log(err));
  };

  const renderPhotoBottomSheet = () => (
    <BottomSheet
      ref={photoBottomSheet}
      index={-1}
      snapPoints={snapPoints}
      onChange={(index: number) => handleSheetChanges(index, photoBottomSheet)}>
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        persistentScrollbar
        removeClippedSubviews>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <View style={[styles.panelButtonContainer]}>
          <View style={[styles.panelButtonView]}>
            <Button
              dark
              loading={false}
              mode="contained"
              onPress={takePhotoFromCamera}
              contentStyle={styles.panelButton}
              theme={{
                colors: {
                  primary: appColors.secondary,
                },
              }}>
              TAKE PHOTO
            </Button>
          </View>
          <View style={[styles.panelButtonView]}>
            <Button
              dark
              loading={false}
              mode="contained"
              onPress={choosePhotoFromLibrary}
              contentStyle={styles.panelButton}
              theme={{
                colors: {
                  primary: appColors.secondary,
                },
              }}>
              CHOOSE FROM LIBRARY
            </Button>
          </View>
          <View style={[styles.panelButtonView]}>
            <Button
              dark
              loading={false}
              mode="contained"
              onPress={() => closeBotSheet(photoBottomSheet)}
              contentStyle={styles.panelButton}
              theme={{
                colors: {
                  primary: appColors.secondary,
                },
              }}>
              CANCEL
            </Button>
          </View>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );

  return (
    <View style={[styles.container]}>
      <View style={[styles.container]}>
        <View style={[styles.userBannerContainer]}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.7, y: 1.0 }}
            locations={[0, 0.1, 0.3, 0.6, 0.8]}
            colors={[
              appColors.primary,
              appColors.gradientOne,
              appColors.gradientTwo,
              appColors.gradientThree,
              appColors.gradientFour,
            ]}
            style={[styles.userBannerBg]}
          />
          {image ? (
            <View>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={[styles.imgContainer]}
              />
              <Pressable
                disabled={isBotSheetActive}
                onPress={() => showBotSheet(photoBottomSheet)}
                style={[styles.editPic]}>
                <Icon name="camera-plus" color={appColors.white} size={14} />
              </Pressable>
            </View>
          ) : (
            <Pressable
              disabled={isBotSheetActive}
              style={[styles.imgContainer]}
              onPress={() => showBotSheet(photoBottomSheet)}>
              <Icon
                name="camera-plus-outline"
                color={appColors.primary}
                size={30}
                style={styles.icon}
              />
            </Pressable>
          )}
        </View>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.7, y: 1.0 }}
          locations={[0, 0.99]}
          colors={[appColors.naturalTwo, appColors.loginBg]}
          style={[styles.formContainer]}>
          <View style={[styles.textContainer]}>
            <TextInput
              mode="outlined"
              label="Name"
              left={
                <TextInput.Icon
                  name="account-outline"
                  style={styles.preText}
                  color={appColors.secondary}
                />
              }
              theme={{
                colors: {
                  primary: appColors.secondary,
                  text: appColors.primary,
                  background: appColors.white,
                },
              }}
              style={[styles.textInput]}
              keyboardType="default"
              maxLength={40}
              onChangeText={(text: string) => setName(text)}
              defaultValue={name}
              value={name}
              autoCorrect={false}
              autoCompleteType="name"
              returnKeyType="next"
              textAlign="left"
              textContentType="name"
            />
          </View>
          <View style={[styles.textContainer]}>
            <TextInput
              mode="outlined"
              label="Pincode"
              left={
                <TextInput.Icon
                  name="map-marker-outline"
                  style={styles.preText}
                  color={appColors.secondary}
                />
              }
              theme={{
                colors: {
                  primary: appColors.secondary,
                  text: appColors.primary,
                  background: appColors.white,
                },
              }}
              style={[styles.textInput]}
              keyboardType="numeric"
              maxLength={6}
              onChangeText={(text: string) => setPincode(text)}
              defaultValue={pincode}
              value={pincode}
              autoCorrect={false}
              autoCompleteType="postal-code"
              returnKeyType="next"
              textAlign="left"
              textContentType="postalCode"
            />
          </View>
          <View style={[styles.radioContainer]}>
            <View style={[styles.radioCmp]}>
              <Chip
                icon="account-circle-outline"
                style={
                  userType === USERTYPE_USER
                    ? [
                        styles.radioChip,
                        {
                          backgroundColor: appColors.secondary,
                        },
                      ]
                    : [
                        styles.radioChip,
                        {
                          borderWidth: 1,
                          borderColor: appColors.greyfriendTwo,
                        },
                      ]
                }
                textStyle={
                  userType === USERTYPE_USER
                    ? { color: appColors.white }
                    : { color: appColors.primary }
                }
                selected={userType === USERTYPE_USER}
                selectedColor={
                  userType === USERTYPE_USER
                    ? appColors.white
                    : appColors.primary
                }
                onPress={() => {
                  Keyboard.dismiss();
                  setUserType(USERTYPE_USER);
                }}>
                Individual
              </Chip>
            </View>
            <View style={[styles.radioCmp]}>
              <Chip
                icon="store-outline"
                style={
                  userType === USERTYPE_SHOP
                    ? [
                        styles.radioChip,
                        {
                          backgroundColor: appColors.secondary,
                        },
                      ]
                    : [
                        styles.radioChip,
                        {
                          borderWidth: 1,
                          borderColor: appColors.greyfriendTwo,
                        },
                      ]
                }
                textStyle={
                  userType === USERTYPE_SHOP
                    ? { color: appColors.white }
                    : { color: appColors.primary }
                }
                selected={userType === USERTYPE_SHOP}
                selectedColor={
                  userType === USERTYPE_SHOP
                    ? appColors.white
                    : appColors.primary
                }
                onPress={() => {
                  Keyboard.dismiss();
                  setUserType(USERTYPE_SHOP);
                }}>
                Shop
              </Chip>
            </View>
          </View>
          <View style={styles.categorybtnContainer}>
            {userType === USERTYPE_USER ? (
              <Button
                dark
                loading={false}
                mode="contained"
                disabled={userType !== USERTYPE_USER}
                onPress={() => showBotSheet(bottomSheet)}
                contentStyle={styles.categoryButton}
                theme={{
                  colors: {
                    primary: appColors.secondary,
                  },
                }}>
                ADD PROFESSION
              </Button>
            ) : (
              <Button
                dark
                loading={false}
                mode="contained"
                disabled={userType !== USERTYPE_SHOP}
                onPress={() => showBotSheet(bottomSheet)}
                contentStyle={styles.categoryButton}
                theme={{
                  colors: {
                    primary: appColors.secondary,
                  },
                }}>
                ADD CATEGORY
              </Button>
            )}
          </View>
          <View style={styles.itemsListContainer}>
            {selectedItems.map((Item: ItemList) => (
              <Text style={styles.itemList}>{Item.name}</Text>
            ))}
          </View>
          <View style={styles.savebtnContainer}>
            <Button
              dark
              loading={false}
              mode="contained"
              disabled={saveDisabled}
              onPress={saveDetails}
              contentStyle={styles.saveButton}
              theme={{
                colors: {
                  primary: appColors.secondary,
                },
              }}>
              SAVE
            </Button>
          </View>
        </LinearGradient>
      </View>
      <Snackbar
        visible={showSnack}
        duration={1000}
        onDismiss={onDismissSnackBar}
        theme={{
          colors: { text: appColors.white, onSurface: appColors.error },
        }}>
        {message}
      </Snackbar>
      {renderBottomSheet()}
      {renderPhotoBottomSheet()}
    </View>
  );
};

export default UserForm;
