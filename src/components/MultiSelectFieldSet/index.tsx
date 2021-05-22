import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ViewStyle,
  TextStyle,
  Pressable,
  TouchableNativeFeedback,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
} from 'react-native-reanimated';

import DropDownSelect, { DataListItems } from './DropDownSelect';
import styles from './MultiSelectFieldSet.style';
import Colors from '../../assets/colors';

const MultiSelectFieldSet = (props: {
  data: DataListItems[];
  maxSelect: number;
  legend: string;
  preText?: string;
  icon?: string;
  fieldSetStyles: ViewStyle[];
  legendStyles: ViewStyle[];
  preTextStyles: ViewStyle[];
  textInputStyles: TextStyle[];
  textInputProps: {};
  placeholder: string;
  selectedItemsChanged: Function;
}) => {
  const {
    data,
    maxSelect,
    fieldSetStyles,
    legend,
    legendStyles,
    preText,
    preTextStyles,
    icon,
    textInputProps,
    textInputStyles,
    placeholder,
    selectedItemsChanged,
  } = props;
  const INITIAL_HEIGHT = 50;
  const height = useSharedValue(INITIAL_HEIGHT);
  const [showList, setShowList] = useState(false);
  const [itemsSelectedLength, setItemsSelectedLength] = useState(0);
  const [selectedItemsList, setSelectedItemsList] = useState<DataListItems[]>(
    [],
  );

  const onPressed = () => {
    !showList
      ? scaleFieldSet(INITIAL_HEIGHT * 3.3)
      : scaleFieldSet(INITIAL_HEIGHT);
    setShowList(!showList);
  };

  // For transform input element fieldset to grow.
  const animatedHeightStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const scaleFieldSet = (heightValue: number) => {
    height.value = withTiming(heightValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const updateSelectedItem = (item: DataListItems) => {
    let itemsSelectedList = [];
    if (!item.selected) {
      itemsSelectedList = selectedItemsList.filter(
        (selectedItem: DataListItems) => item.id !== selectedItem.id,
      );
    } else {
      itemsSelectedList = [item, ...selectedItemsList];
    }
    setItemsSelectedLength(itemsSelectedList.length);
    setSelectedItemsList(itemsSelectedList);
    selectedItemsChanged(itemsSelectedList);
  };

  const removeSelected = (id: string) => {
    const itemsSelectedList = selectedItemsList.filter(
      (selectedItem: DataListItems) => id !== selectedItem.id,
    );
    console.log(id);
    setSelectedItemsList(itemsSelectedList);
    selectedItemsChanged(itemsSelectedList);
  };

  return (
    <Animated.View style={[styles.multiSelectContainer, animatedHeightStyles]}>
      <View style={[fieldSetStyles, styles.fieldSetOverRide]}>
        <Text style={legendStyles}>{legend}</Text>
        {icon !== undefined ? (
          <Icon
            name={icon}
            color={Colors.secondary}
            size={24}
            style={preTextStyles}
          />
        ) : (
          <Text style={preTextStyles}>{preText}</Text>
        )}
        <Pressable style={[styles.inputSelectView]} onPress={onPressed}>
          <Text style={[styles.inputText]}>
            {itemsSelectedLength
              ? `${itemsSelectedLength} selected`
              : placeholder}
          </Text>
          <Icon
            name={
              showList
                ? 'chevron-up-circle-outline'
                : 'chevron-down-circle-outline'
            }
            color={Colors.secondary}
            size={24}
          />
        </Pressable>
      </View>
      <DropDownSelect
        data={data}
        show={showList}
        maxSelect={maxSelect}
        textInputProps={textInputProps}
        textInputStyles={textInputStyles}
        selectedItemsList={selectedItemsList}
        updateSelectedItem={updateSelectedItem}
      />
      <View style={[styles.profContainer]}>
        {!showList && selectedItemsList.length
          ? selectedItemsList.map((item: DataListItems) => (
              <View style={[styles.profTag]} key={item.id}>
                <Text style={styles.profText}>{item.name}</Text>
              </View>
            ))
          : null}
      </View>
    </Animated.View>
  );
};

export default MultiSelectFieldSet;
