import React, { ComponentProps, FC } from 'react';
import { View, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import styles from './SectionCards.style';
import PersonCard from '../PersonCard';
import { professionList } from '../../utils/professionList';
import { ItemList } from '../../types';

const SectionCards = (
  props: ComponentProps<FC> & {
    card: ItemList;
  },
) => {
  const { card } = props;
  const { dark } = useTheme();

  const getItemLayout = (data: any, index: number) => ({
    length: 170,
    offset: 170 * index,
    index: index,
  });

  const renderPersonCards = ({ item }: { item: ItemList }) => (
    <PersonCard data={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{card.name}</Text>
      </View>
      <View style={[styles.cardContainer]}>
        <FlatList
          horizontal
          data={professionList}
          extraData={[dark]}
          initialNumToRender={2}
          getItemLayout={getItemLayout}
          renderItem={renderPersonCards}
        />
      </View>
    </View>
  );
};

export default SectionCards;
