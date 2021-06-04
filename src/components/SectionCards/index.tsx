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
          renderItem={({ item }) => <PersonCard data={item} />}
        />
      </View>
    </View>
  );
};

export default SectionCards;
