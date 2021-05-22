import React, { ReactElement, useEffect } from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { material } from 'react-native-typography';
import LottieView from 'lottie-react-native';

import {
  LOGOPOSITIONFROMMIDDLE,
  ACTIVITYPOSITIONFROMTOP,
  TEXTLOADERPOSITIONFROMTOP,
} from '../../utils/constants';
import styles from './Splash.style';

const Splash = (): ReactElement => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  useEffect(() => {
    offset.value = withTiming(LOGOPOSITIONFROMMIDDLE, {
      duration: 1000,
      easing: Easing.elastic(1),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyles]}>
        <Image source={require('../../assets/img/bootsplash_logo.png')}></Image>
      </Animated.View>
      <View style={styles.splashContainer}>
        <LottieView
          source={require('../../assets/lottie/splash_cups.json')}
          autoPlay
          loop
        />
        <ActivityIndicator
          style={{ transform: [{ translateY: ACTIVITYPOSITIONFROMTOP }] }}
          size="small"
          color="#FFFFFF"
        />
        <Text
          style={[
            { transform: [{ translateY: TEXTLOADERPOSITIONFROMTOP }] },
            material.body1White,
          ]}>
          Loading
        </Text>
      </View>
    </View>
  );
};

export default Splash;
