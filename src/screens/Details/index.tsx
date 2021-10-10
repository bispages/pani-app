import React, { useEffect, useRef } from 'react';
import { View, FlatList, Image, Animated } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import faker from 'faker';

import { ItemList } from '../../types';

faker.seed(100);
type routeParams = {
  route: { params: { item: ItemList } };
};

type PersonCard = {
  id: string;
  avatar: string;
  name: string;
  jobTitle: string;
  phone: string;
};

const DATA = [...Array(21).keys()].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatar: faker.image.avatar(),
  name: faker.name.findName(),
  jobTitle: faker.name.jobTitle(),
  phone: faker.phone.phoneNumberFormat(),
}));

const Details = ({
  route: {
    params: { item },
  },
}: routeParams) => {
  const CARD_SPACING = 5;
  const CARD_SIZE = 70;
  const TOTAL_CARD_HEIGHT = CARD_SIZE + 4 * CARD_SPACING;

  const { colors } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderPersonCards = ({
    item,
    index,
  }: {
    item: PersonCard;
    index: number;
  }) => {
    const scale = scrollY.interpolate({
      inputRange: [
        -1,
        0,
        TOTAL_CARD_HEIGHT * index,
        TOTAL_CARD_HEIGHT * (index + 2),
      ],
      outputRange: [1, 1, 1, 0],
    });

    const opacity = scrollY.interpolate({
      inputRange: [
        -1,
        0,
        TOTAL_CARD_HEIGHT * index,
        TOTAL_CARD_HEIGHT * (index + 0.5),
        TOTAL_CARD_HEIGHT * (index + 1),
      ],
      outputRange: [1, 1, 1, 0.5, 0],
    });

    return (
      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          margin: CARD_SPACING,
          padding: CARD_SPACING,
          borderRadius: 15,
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 4,
          opacity,
          transform: [{ scale }],
        }}>
        <Image
          source={{ uri: item.avatar }}
          style={{
            width: CARD_SIZE,
            height: CARD_SIZE,
            borderRadius: CARD_SIZE,
          }}
        />
        <View style={{ marginLeft: 15 }}>
          <Text
            style={{ color: colors.primary, fontWeight: '700', fontSize: 18 }}>
            {item.name}
          </Text>
          <Text
            style={{ color: colors.primary, fontWeight: '300', fontSize: 12 }}>
            {item.phone}
          </Text>
          <Text
            style={{ color: colors.primary, fontWeight: '300', fontSize: 10 }}>
            {item.jobTitle}
          </Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1, paddingBottom: 5 }}>
      <View
        style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.name}</Text>
      </View>
      <View style={{ flex: 0.9 }}>
        <Animated.FlatList
          data={DATA}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          renderItem={renderPersonCards}
          contentContainerStyle={{ padding: CARD_SPACING }}
        />
      </View>
    </View>
  );
};

export default Details;
