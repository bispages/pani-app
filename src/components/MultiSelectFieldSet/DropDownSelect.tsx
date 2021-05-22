import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ViewStyle,
  FlatList,
  useWindowDimensions,
  TouchableNativeFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../assets/colors';
import styles from './MultiSelectFieldSet.style';

export interface DataListItems {
  id: string;
  name: string;
  selected?: boolean;
}

const ListItem = ({
  name,
  id,
  maxSelect,
  selectedItemsList,
  updateSelectedItem,
}: {
  id: string;
  name: string;
  maxSelect: number;
  selectedItemsList: DataListItems[];
  updateSelectedItem: Function;
}) => {
  const windowWidth = useWindowDimensions().width;
  const rippleRadius = windowWidth * 0.4;
  const [selected, setSelected] = useState(false);

  const toggleAddToSelectedProfession = () => {
    if (selectedItemsList.length <= maxSelect - 1 || selected) {
      updateSelectedItem({ id, name, selected: !selected });
      setSelected(!selected);
    }
  };

  useEffect(() => {
    if (selectedItemsList.length) {
      const isSelected = selectedItemsList.filter(
        (selectedItem: DataListItems) => id === selectedItem.id,
      ).length;
      if (isSelected) setSelected(true);
    }
  }, []);

  const getStylesItem = () =>
    selected ? { ...styles.item, ...styles.selectedItem } : styles.item;

  const getStylesTitle = () =>
    selected ? { ...styles.title, ...styles.selectedTitle } : styles.title;

  return (
    <View style={styles.overflowNone}>
      <TouchableNativeFeedback
        onPress={toggleAddToSelectedProfession}
        background={TouchableNativeFeedback.Ripple(
          Colors.primary,
          false,
          rippleRadius,
        )}>
        <View style={getStylesItem()}>
          <Text style={getStylesTitle()}>{name}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const DropDownSelect = (props: {
  show: boolean;
  data: DataListItems[];
  maxSelect: number;
  textInputProps: {};
  textInputStyles: ViewStyle[];
  selectedItemsList: DataListItems[];
  updateSelectedItem: Function;
}) => {
  const {
    data,
    show,
    maxSelect,
    textInputProps,
    textInputStyles,
    selectedItemsList,
    updateSelectedItem,
  } = props;
  const [dataList, setDataList] = useState(data);
  const INITIAL_SCALE = 0;
  const INITIAL_HEIGHT = 0;
  const scale = useSharedValue(INITIAL_SCALE);
  const height = useSharedValue(INITIAL_HEIGHT);

  useEffect(() => {
    show ? scaleFieldSet(1, 200) : scaleFieldSet(0, 0);
  }, [show]);

  // For transform input element fieldset to grow.
  const animatedScaleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: scale.value }, { perspective: 1200 }],
      height: height.value,
    };
  });

  const scaleFieldSet = (scaleValue: number, heightValue: number) => {
    scale.value = withTiming(scaleValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    height.value = withTiming(heightValue, {
      duration: 100,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  const inputProps = {
    ...textInputProps,
    onChangeText: (text: string) => onSearchTextChange(text),
  };

  const onSearchTextChange = (text: string) => {
    let curDataList = [...data];
    if (text !== '') {
      curDataList = data.filter((data: DataListItems) =>
        data.name.toLowerCase().includes(text.toLowerCase()),
      );
    }
    setDataList(curDataList);
  };

  const renderItem = ({ item }: { item: DataListItems }) => (
    <ListItem
      name={item.name}
      id={item.id}
      maxSelect={maxSelect}
      selectedItemsList={selectedItemsList}
      updateSelectedItem={updateSelectedItem}
    />
  );

  return (
    <Animated.View
      style={[...textInputStyles, styles.selectContainer, animatedScaleStyles]}>
      <View style={styles.searchSection}>
        <TextInput {...inputProps} style={[styles.searchInput]} />
        <Icon
          name="magnify"
          color={Colors.secondary}
          size={24}
          style={styles.searchIcon}
        />
      </View>
      <View style={[styles.listContainer]}>
        <FlatList
          data={dataList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          horizontal
        />
      </View>
    </Animated.View>
  );
};

export default DropDownSelect;
