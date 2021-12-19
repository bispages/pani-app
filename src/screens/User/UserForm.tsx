import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  RefObject,
} from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {
  TextInput,
  Button,
  Chip,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './User.style';
import {
  // PROFESSIONNUMBER,
  USERTYPE_USER,
  USERTYPE_SHOP,
  USERFORM_BOTSHEET_SNAPMAX,
  USERFORM_BOTSHEET_SNAPMID,
  USERFORM_BOTSHEET_SNAPMIN,
} from '../../utils/constants';
import { ItemList } from '../../types';
import { login, saveUser } from '../../store/actions';
import useBackHandler from '../../hooks/useBackHandler';
// import { professionList } from '../../utils/professionList';
// import { categoryList } from '../../utils/categoryList';

type routeParams = {
  route: { params: { phone: string } };
};

const UserForm = ({ route: { params } }: routeParams) => {
  const { phone } = params;
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [userType, setUserType] = useState(USERTYPE_USER);
  const [image, setImage] = useState<Image | null>(null);
  // const [selectedItems, setSelectedItems] = useState<ItemList[]>([]);
  const [saveDisabled, setSaveDisabled] = useState(true);
  // const [dataList, setDataList] = useState(professionList);
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const bottomSheet = useRef<BottomSheet>(null);
  const photoBottomSheet = useRef<BottomSheet>(null);
  const windowWidth = useWindowDimensions().width;
  const { colors, appColors } = useTheme();
  const dispatchAction = useDispatch();

  const snapPoints = useMemo(
    () => [
      USERFORM_BOTSHEET_SNAPMIN,
      USERFORM_BOTSHEET_SNAPMID,
      USERFORM_BOTSHEET_SNAPMAX,
    ],
    [],
  );
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
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
    (sheet: RefObject<BottomSheet>) => {
      keyboardDidHide();
      sheet.current?.snapToIndex(1)
    },
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

  // useEffect(() => {
  //   const list = userType === USERTYPE_USER ? professionList : categoryList;
  //   setDataList(list);
  //   setSelectedItems([]);
  // }, [userType]);

  useEffect(() => {
    if (pincode.length >= 6) Keyboard.dismiss();
    // setSaveDisabled(!(name && pincode && selectedItems.length > 0));
    setSaveDisabled(!(name && pincode));
  }, [name, pincode]);
  // }, [name, pincode, selectedItems]);


  const saveDetails = () => {
    const userDetails = {
      phone,
      name,
      pincode,
      userType,
      image,
      // category: selectedItems,
      category: []
    };
    AsyncStorage.setItem('user', JSON.stringify(userDetails)).then(() => {
      dispatchAction(saveUser(userDetails));
      dispatchAction(login({ phone }));
    });
  };

  // const updateSelectedItems = (item: ItemList, index: number) => {
  //   if (
  //     selectedItems.length <= PROFESSIONNUMBER - 1 ||
  //     (item.selected !== undefined && item.selected)
  //   ) {
  //     let itemsSelectedList: ItemList[] = [];
  //     let currentItem = {} as ItemList;
  //     if (item.selected === undefined || !item.selected) {
  //       currentItem = { ...item, selected: true };
  //       itemsSelectedList = [currentItem, ...selectedItems];
  //     } else {
  //       currentItem = { ...item, selected: false };
  //       itemsSelectedList = selectedItems.filter(
  //         (selectedItem: ItemList) => item.id !== selectedItem.id,
  //       );
  //     }
  //     const newDataList = dataList.slice();
  //     newDataList[index] = currentItem;
  //     setSelectedItems(itemsSelectedList);
  //     setDataList(newDataList);
  //   } else {
  //     setMessage(`Can't add more`);
  //     setShowSnack(true);
  //   }
  // };

  // const renderBottomSheet = () => (
  //   <BottomSheet
  //     ref={bottomSheet}
  //     index={-1}
  //     snapPoints={snapPoints}
  //     onChange={(index: number) => handleSheetChanges(index, bottomSheet)}
  //     backdropComponent={renderBackdrop}>
  //     <BottomSheetScrollView
  //       showsHorizontalScrollIndicator={false}
  //       contentContainerStyle={[styles.listContainer]}
  //       persistentScrollbar
  //       removeClippedSubviews>
  //       {dataList.map((item: ItemList, index: number) => {
  //         return (
  //           <Chip
  //             key={item.id}
  //             icon={
  //               userType === USERTYPE_SHOP
  //                 ? 'store-outline'
  //                 : 'account-circle-outline'
  //             }
  //             style={
  //               item.selected
  //                 ? [
  //                     styles.dataListChip,
  //                     {
  //                       backgroundColor: colors.accent,
  //                       borderColor: colors.accent,
  //                     },
  //                   ]
  //                 : [
  //                     styles.dataListChip,
  //                     {
  //                       backgroundColor: colors.text,
  //                       borderColor: colors.disabled,
  //                     },
  //                   ]
  //             }
  //             textStyle={
  //               item.selected
  //                 ? { color: colors.text }
  //                 : { color: colors.primary }
  //             }
  //             selected={item?.selected ?? false}
  //             selectedColor={item.selected ? colors.text : colors.primary}
  //             onPress={() => updateSelectedItems({ ...item }, index)}>
  //             {item.name}
  //           </Chip>
  //         );
  //       })}
  //     </BottomSheetScrollView>
  //   </BottomSheet>
  // );

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 120,
      compressImageMaxHeight: 120,
      cropping: true,
      mediaType: 'photo',
    })
      .then((image: Image) => {
        closeBotSheet(photoBottomSheet);
        if ('path' in image) setImage(image);
      })
      .catch(err => console.log(err));
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 120,
      height: 120,
      cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      cropperActiveWidgetColor: colors.accent,
    })
      .then((image: Image) => {
        closeBotSheet(photoBottomSheet);
        if ('path' in image) setImage(image);
      })
      .catch(err => console.log(err));
  };

  const renderPhotoBottomSheet = () => (
    <BottomSheet
      ref={photoBottomSheet}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={(index: number) => handleSheetChanges(index, photoBottomSheet)}
      backdropComponent={renderBackdrop}>
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContainer]}
        persistentScrollbar
        removeClippedSubviews>
        <View style={{ alignItems: 'center', paddingTop: 10 }}>
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
                  primary: colors.accent,
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
                  primary: colors.accent,
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
                  primary: colors.accent,
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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.userBannerContainer]}>
          {image ? (
            <>
              <ImageBackground
                source={{
                  uri: image.path,
                }}
                style={[
                  styles.imgContainer,
                  {
                    borderColor: appColors.white,
                    backgroundColor: appColors.dimwhite,
                  },
                ]}
              />
              <Pressable
                disabled={isBotSheetActive}
                onPress={() => showBotSheet(photoBottomSheet)}
                style={[styles.editPic, { backgroundColor: colors.accent }]}>
                <Icon name="camera-plus" color={colors.text} size={14} />
              </Pressable>
            </>
          ) : (
            <Pressable
              disabled={isBotSheetActive}
              style={[
                styles.imgContainer,
                {
                  borderColor: appColors.white,
                  backgroundColor: appColors.dimwhite,
                },
              ]}
              onPress={() => showBotSheet(photoBottomSheet)}>
              <Icon
                name="camera-plus-outline"
                color={colors.primary}
                size={30}
                style={styles.icon}
              />
            </Pressable>
          )}
        </View>
        <View style={[styles.formContainer]}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                width: windowWidth,
                height: windowWidth * 2,
                borderRadius: 40,
                backgroundColor: '#f7f7f7',
                transform: [{ translateY: -windowWidth * 0.01 }],
              },
            ]}
          />
          <View style={[styles.textContainer]}>
            <TextInput
              mode="outlined"
              label="Name"
              left={
                <TextInput.Icon
                  name="account-outline"
                  style={styles.preText}
                  color={colors.accent}
                />
              }
              theme={{
                colors: {
                  primary: colors.accent,
                  text: colors.primary,
                  background: colors.text,
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
                  color={colors.accent}
                />
              }
              theme={{
                colors: {
                  primary: colors.accent,
                  text: colors.primary,
                  background: colors.text,
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
                        backgroundColor: colors.accent,
                        borderColor: colors.accent,
                      },
                    ]
                    : [
                      styles.radioChip,
                      {
                        backgroundColor: colors.text,
                        borderColor: colors.disabled,
                      },
                    ]
                }
                textStyle={
                  userType === USERTYPE_USER
                    ? { color: colors.text }
                    : { color: colors.primary }
                }
                selected={userType === USERTYPE_USER}
                selectedColor={
                  userType === USERTYPE_USER ? colors.text : colors.primary
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
                        backgroundColor: colors.accent,
                        borderColor: colors.accent,
                      },
                    ]
                    : [
                      styles.radioChip,
                      {
                        backgroundColor: colors.text,
                        borderColor: colors.disabled,
                      },
                    ]
                }
                textStyle={
                  userType === USERTYPE_SHOP
                    ? { color: colors.text }
                    : { color: colors.primary }
                }
                selected={userType === USERTYPE_SHOP}
                selectedColor={
                  userType === USERTYPE_SHOP ? colors.text : colors.primary
                }
                onPress={() => {
                  Keyboard.dismiss();
                  setUserType(USERTYPE_SHOP);
                }}>
                Shop
              </Chip>
            </View>
          </View>
          {/* <View style={styles.categorybtnContainer}>
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
                    primary: colors.accent,
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
                    primary: colors.accent,
                  },
                }}>
                ADD CATEGORY
              </Button>
            )}
          </View> */}
          {/* <View style={styles.itemsListContainer}>
            {selectedItems.map((item: ItemList) => (
              <Text
                key={item.id}
                style={[styles.itemList, { color: colors.primary }]}>
                {item.name}
              </Text>
            ))}
          </View> */}
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
                  primary: colors.accent,
                },
              }}>
              SAVE
            </Button>
          </View>
        </View>
      </View>
      <Snackbar
        visible={showSnack}
        duration={1000}
        onDismiss={onDismissSnackBar}
        theme={{
          colors: { surface: colors.text, onSurface: colors.error },
        }}>
        {message}
      </Snackbar>
      {/* {renderBottomSheet()} */}
      {renderPhotoBottomSheet()}
    </View>
  );
};

export default UserForm;
