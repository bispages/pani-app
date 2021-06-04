import React, { createRef, RefObject, ComponentProps, FC } from 'react';
import { View, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { List, useTheme } from 'react-native-paper';

import styles from './CategoryListScroll.style';
import { ItemList } from '../../types';
import { professionList } from '../../utils/professionList';

type Animate = {
  animate: Function;
};

const CategoryListScroll = (
  props: ComponentProps<FC> & {
    searchFunc: Function;
  },
) => {
  const { searchFunc } = props;
  const { dark, colors, appColors } = useTheme();
  const fadeIn = {
    from: {
      opacity: 0.5,
    },
    to: {
      opacity: 1,
    },
  };

  const animateOpacity = (ref: RefObject<Animatable.View & View & Animate>) => {
    if (ref.current?.animate) ref.current.animate(fadeIn);
  };

  const renderProfessions = ({
    item,
    index,
  }: {
    item: ItemList;
    index: number;
  }) => {
    const listItemRef = createRef<Animatable.View & View & Animate>();
    return (
      <Animatable.View
        animation={fadeIn}
        ref={listItemRef}
        useNativeDriver={true}>
        <List.Item
          title={item.name}
          style={{
            paddingVertical: 4,
            backgroundColor: dark ? colors.accent : appColors.dark,
          }}
          titleStyle={{
            fontSize: 14,
            textAlign: 'justify',
            textAlignVertical: 'center',
            color: dark ? colors.primary : colors.primary,
          }}
          onPress={() => {
            animateOpacity(listItemRef);
            searchFunc('', item);
          }}
        />
      </Animatable.View>
    );
  };

  return (
    <View
      style={[
        styles.categoryListContainer,
        {
          borderBottomColor: dark ? colors.text : colors.primary,
        },
      ]}>
      <FlatList
        horizontal
        data={professionList}
        extraData={[dark]}
        initialNumToRender={4}
        renderItem={renderProfessions}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: '100%',
              borderWidth: 0.2,
              borderColor: dark ? colors.text : colors.primary,
            }}
          />
        )}
      />
    </View>
  );
};

export default CategoryListScroll;
