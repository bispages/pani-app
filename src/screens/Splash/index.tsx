import React, { ReactElement, useEffect } from 'react';
import {
  View,
  Image,
  useWindowDimensions,
  NativeModules,
  ActivityIndicator,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { material } from 'react-native-typography';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LOGOPOSITIONFROMTOP,
  ACTIVITYPOSITIONFROMTOP,
  TEXTLOADERPOSITIONFROMTOP,
} from '../../utils/constants';
import { onBoard } from '../../store/actions';
import styles from './Splash.style';

const Splash = (): ReactElement => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { StatusBarManager } = NativeModules;
  const windowHeight = useWindowDimensions().height;
  const offset = useSharedValue(windowHeight / 2 - StatusBarManager.HEIGHT);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  useEffect(() => {
    offset.value = withTiming(LOGOPOSITIONFROMTOP, {
      duration: 1000,
      easing: Easing.elastic(1),
    });

    AsyncStorage.getItem('onboarded').then(value => {
      if (value !== null && value === '1') {
        // TODO - Remove comment for business logic
        // dispatch(onBoard());
      }
      // Shows the loader for 2 seconds
      setTimeout(() => {
        navigation.navigate('onboard');
      }, 2000);
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
