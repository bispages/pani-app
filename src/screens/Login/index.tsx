import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  NativeModules,
  TouchableNativeFeedback,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useNavigation, CommonActions } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { material } from 'react-native-typography';

import useBackHandler from '../../hooks/useBackHandler';
import Colors from '../../assets/colors';
import styles from './Login.style';
import LoginPhone from '../../assets/img/loginphone.svg';

const Login = () => {
  const INITIAL_SCALE = 1;
  const INITIAL_OFFSET = 0;
  const navigation = useNavigation();
  const { StatusBarManager } = NativeModules;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const rippleRadius = windowWidth * 0.4;
  const [phone, setPhone] = useState('');
  const submit = () => null;
  const scale = useSharedValue(INITIAL_SCALE);
  const offsetView = useSharedValue(INITIAL_OFFSET);
  const offsetImage = useSharedValue(INITIAL_OFFSET);

  // For image scaling
  const animatedScaleStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // For transform input element to top of keyboard
  const animatedTranslateStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetView.value }],
    };
  });

  // For transform input element to top of keyboard
  const animatedImageTranslateStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offsetImage.value }],
    };
  });

  const scaleImage = (
    scaleValue: number,
    offsetViewValue: number,
    offsetImageValue: number,
  ) => {
    scale.value = withTiming(scaleValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    offsetView.value = withTiming(offsetViewValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    offsetImage.value = withTiming(offsetImageValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  };

  // Adds hardware BackHandler hook.
  useBackHandler();

  useEffect(() => {
    navigation.dispatch(state => {
      // Remove all other routes from the stack so that user cannot go back.
      const routes = state.routes.filter(r => r.name === 'login');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });

    // Keyboard events.
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidHide = () =>
    scaleImage(INITIAL_SCALE, INITIAL_OFFSET, INITIAL_OFFSET);

  return (
    <LinearGradient
      locations={[0, 0.99]}
      colors={[Colors.loginBg, Colors.naturalTwo]}
      style={[styles.login]}>
      <Animated.View style={[styles.image, animatedImageTranslateStyles]}>
        <Animated.View style={[{ width: '100%' }, animatedScaleStyles]}>
          <LoginPhone width="90%" height="90%" />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.avoidView, animatedTranslateStyles]}>
        <View style={styles.headline}>
          <Text style={[styles.heading, material.headline]}>
            Enter your phone number
          </Text>
          <Text style={[styles.subHeading, material.subheading]}>
            We will send you the 4 digit verification code
          </Text>
        </View>
        <View style={styles.inputset}>
          <View style={styles.fieldSet}>
            <Text style={[material.body1, styles.legend]}>Mobile</Text>
            <Text style={[material.title, styles.preText]}>+91</Text>
            <TextInput
              style={[material.title, styles.textInput]}
              placeholder="Mobile number"
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={text => setPhone(text)}
              defaultValue={phone}
              autoCorrect={false}
              autoCompleteType="tel"
              returnKeyType="done"
              textAlign="left"
              textContentType="telephoneNumber"
              onPressIn={() =>
                scaleImage(
                  INITIAL_SCALE * 0.5,
                  INITIAL_OFFSET - (windowHeight / 4 - StatusBarManager.HEIGHT),
                  INITIAL_OFFSET - 20,
                )
              }
            />
          </View>
          <TouchableNativeFeedback
            style={styles.btnset}
            onPress={submit}
            background={TouchableNativeFeedback.Ripple(
              Colors.primary,
              false,
              rippleRadius,
            )}>
            <View style={styles.button}>
              <Text style={material.buttonWhite}>GENERATE OTP</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default Login;
