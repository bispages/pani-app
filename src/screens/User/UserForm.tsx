import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  TextInput,
  Button,
  Chip,
  Dialog,
  Portal,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './User.style';
import {
  PROFESSIONNUMBER,
  USERTYPE_USER,
  USERTYPE_SHOP,
} from '../../utils/constants';
import { professionList } from '../../utils/professionList';
import { categoryList } from '../../utils/categoryList';

type ItemList = {
  id: string;
  name: string;
  selected?: boolean;
};

const UserForm = () => {
  const { appColors } = useTheme();
  const [name, setName] = useState('');
  const [pincode, setPincode] = useState('');
  const [userType, setUserType] = React.useState(USERTYPE_USER);
  const [showList, setShowList] = React.useState(false);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [selectedItems, setSelectedItems] = useState<ItemList[]>([]);
  const [dataList, setDataList] = useState(professionList);
  const [showSnack, setShowSnack] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const showDialog = () => setShowList(true);
  const hideDialog = () => setShowList(false);
  const onDismissSnackBar = () => {
    setShowSnack(false);
    setMessage('');
  };

  const onTextChange = (text: string) => {
    setName(text);
  };

  const onPincodeChange = (text: string) => {
    setPincode(text);
  };

  useEffect(() => {
    const list = userType === USERTYPE_USER ? professionList : categoryList;
    setDataList(list);
    setSelectedItems([]);
  }, [userType]);

  useEffect(() => {
    setSaveDisabled(!(name && pincode && selectedItems.length > 0));
  }, [name, pincode, selectedItems]);

  const saveDetails = () => {
    const payload = { name, pincode, userType, category: selectedItems };
  };

  const updateSelectedItems = (item: ItemList) => {
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
      const index = newDataList.findIndex(
        ({ name, id }) => name === item.name && id === item.id,
      );
      newDataList[index] = currentItem;
      setSelectedItems(itemsSelectedList);
      setDataList(newDataList);
    } else {
      setMessage(`Can't add more`);
      setShowSnack(true);
    }
  };

  return (
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
        <View style={[styles.imgContainer]}>
          <Icon
            name="camera-plus-outline"
            color={appColors.primary}
            size={30}
            style={styles.icon}
          />
        </View>
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
            onChangeText={(text: string) => onTextChange(text)}
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
            onChangeText={(text: string) => onPincodeChange(text)}
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
                userType === USERTYPE_USER ? appColors.white : appColors.primary
              }
              onPress={() => setUserType(USERTYPE_USER)}>
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
                userType === USERTYPE_SHOP ? appColors.white : appColors.primary
              }
              onPress={() => setUserType(USERTYPE_SHOP)}>
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
              onPress={showDialog}
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
              onPress={showDialog}
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
        <Portal>
          <Dialog visible={showList} onDismiss={hideDialog}>
            <Dialog.Title
              style={{
                color: appColors.primary,
              }}>
              {`SELECT ${
                userType === USERTYPE_USER ? 'PROFESSION' : 'CATEGORY'
              }`}
            </Dialog.Title>
            <Dialog.ScrollArea>
              <View
                style={[
                  {
                    maxHeight: 300,
                    marginVertical: 10,
                  },
                ]}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[styles.listContainer]}
                  persistentScrollbar
                  removeClippedSubviews>
                  {dataList.map((item: ItemList) => {
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
                        onPress={() => updateSelectedItems({ ...item })}>
                        {item.name}
                      </Chip>
                    );
                  })}
                </ScrollView>
              </View>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </LinearGradient>
      <Snackbar
        visible={showSnack}
        duration={1000}
        onDismiss={onDismissSnackBar}
        theme={{
          colors: { text: appColors.white, onSurface: appColors.error },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

export default UserForm;
