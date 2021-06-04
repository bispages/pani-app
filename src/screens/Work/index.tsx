import React, { ComponentProps, FC } from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import Animated, {
  Extrapolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { Card, Title, useTheme, Text } from 'react-native-paper';

import { RootState } from '../../store';
import { ItemList, User } from '../../types';
import styles from './Work.style';
import { ViewMap } from '../../utils/viewMap';

const Work = (props: ComponentProps<FC>) => {
  const margin = 5;
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  // reduce the marginRight.
  const snapWidth = width - margin * 2;
  const snapHeight = height * 0.6 - margin * 2 - 34;
  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user,
  );
  const { category } = user;

  // Animation functions.
  const translationY = useSharedValue(0);
  const handleHorizontalScroll = useAnimatedScrollHandler({
    onScroll: (event: { contentOffset: { x: number } }) => {
      translationY.value = event.contentOffset.x;
    },
  });

  // Animation for details cards at bottom.
  const animateCards = (index: number) =>
    useAnimatedStyle(() => {
      return {
        opacity: Animated.interpolate(
          translationY.value,
          [0, snapWidth + margin, 2 * (snapWidth + margin)],
          [0, 0, 0].fill(1, index, index + 1),
        ),
        transform: [
          index === 0
            ? { translateY: translationY.value }
            : {
                translateY: Animated.interpolate(
                  translationY.value,
                  [0, snapWidth + margin, 2 * (snapWidth + margin)],
                  [0, 0, 0].fill(translationY.value, index + 1, index + 2),
                ),
              },
          {
            scale: Animated.interpolate(
              translationY.value,
              [0, snapWidth + margin, 2 * (snapWidth + margin)],
              [0, 0, 0].fill(1, index, index + 1),
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    });

  // This gets the corresponding view for details card.
  const getCategoryDetailsView = (item: ItemList) => {
    const Component = ViewMap[item.id];
    return Component ? (
      <Component {...props} />
    ) : (
      <View>
        <Text>We are adding options for these categories.</Text>
      </View>
    );
  };

  // Renders category cards
  const renderCategoryCards = ({
    item,
    index,
  }: {
    item: ItemList;
    index: number;
  }) => {
    return (
      <TouchableOpacity onPress={() => {}} key={item.id}>
        <Card
          style={[
            styles.cardStyles,
            {
              width: snapWidth,
              marginRight:
                category && index === category.length - 1 ? 0 : margin,
            },
          ]}>
          <Card.Content style={styles.cardContent}>
            <Title>
              <Text style={{ color: colors.text }}>{item.name}</Text>
            </Title>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  // Renders category details cards
  const renderCategoryDetailsCards = ({
    item,
    index,
  }: {
    item: ItemList;
    index: number;
  }) => {
    const animatedStyles = animateCards(index);
    return (
      <Animated.View
        style={[
          {
            height: snapHeight,
            width: snapWidth,
            left: margin,
            position: 'absolute',
          },
          animatedStyles,
        ]}
        key={item.id}>
        <Card style={[styles.detailsCardStyles]}>
          <Card.Content style={styles.detailsCardContent}>
            {getCategoryDetailsView(item)}
          </Card.Content>
        </Card>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.ScrollView
          horizontal
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          disableIntervalMomentum={true}
          snapToInterval={snapWidth + margin}
          snapToAlignment="center"
          pagingEnabled
          onScroll={handleHorizontalScroll}>
          {category
            ? category.map((item, index) =>
                renderCategoryCards({ item, index }),
              )
            : null}
        </Animated.ScrollView>
      </View>
      <View style={styles.actionsContainer}>
        {category
          ? category.map((item, index) =>
              renderCategoryDetailsCards({ item, index }),
            )
          : null}
      </View>
    </View>
  );
};

export default Work;
