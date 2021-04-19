import React, { useEffect, useReducer, createRef, RefObject } from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  NativeModules,
  TouchableOpacity,
  TouchableNativeFeedback,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../../assets/colors';
import styles from './Login.style';
import Verifyphone from '../../assets/img/verifyphone.svg';

const initialState = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
};

type CodeObject = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
};

type Action = {
  type: string;
  value: string;
};

function reducer(state: CodeObject | any, action: Action) {
  switch (action.type) {
    case 'code1':
      return { ...state, code1: action.value };
    case 'code2':
      return { ...state, code2: action.value };
    case 'code3':
      return { ...state, code3: action.value };
    case 'code4':
      return { ...state, code4: action.value };
    default:
      throw new Error('Codes not fetched');
  }
}

const VerifyPhone = () => {
  const INITIAL_SCALE = 1;
  const INITIAL_OFFSET = 0;
  const navigation = useNavigation();
  const { StatusBarManager } = NativeModules;
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const rippleRadius = windowWidth * 0.4;
  const scale = useSharedValue(INITIAL_SCALE);
  const offsetView = useSharedValue(INITIAL_OFFSET);
  const offsetImage = useSharedValue(INITIAL_OFFSET);
  const [state, dispatch] = useReducer(reducer, initialState);
  const refs: RefObject<TextInput>[] = [];

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

  useEffect(() => {
    // Keyboard events.
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidHide = () =>
    scaleImage(INITIAL_SCALE, INITIAL_OFFSET, INITIAL_OFFSET);

  const onTextChange = (key: string, text: string, index: number) => {
    dispatch({ type: key, value: text });
    if (index < 3 && text !== '') refs[index + 1].current?.focus();
  };

  const submit = () => null;

  return (
    <LinearGradient
      locations={[0, 0.99]}
      colors={[Colors.loginBg, Colors.naturalTwo]}
      style={[styles.login]}>
      <Animated.View style={[styles.image, animatedImageTranslateStyles]}>
        <Animated.View style={[{ width: '100%' }, animatedScaleStyles]}>
          <Verifyphone width="100%" height="90%" />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.avoidView, animatedTranslateStyles]}>
        <View style={styles.headline}>
          <Text style={[styles.heading]}>OTP Verification</Text>
          <Text style={[styles.subHeading]}>
            Enter the OTP sent to{' '}
            <Text style={[styles.phonenum]}>+91 9065787380</Text>
          </Text>
        </View>
        <View style={styles.inputset}>
          <View style={styles.codeContainer}>
            {Object.keys(initialState).map((key, index) => {
              const newRef = createRef<TextInput>();
              refs.push(newRef);
              return (
                <TextInput
                  key={key}
                  ref={newRef}
                  style={[styles.otpTextInput]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={text => onTextChange(key, text, index)}
                  defaultValue={state[key]}
                  autoCorrect={false}
                  returnKeyType={key === 'code4' ? 'done' : 'next'}
                  textAlign="center"
                  textContentType="oneTimeCode"
                  onPressIn={() =>
                    scaleImage(
                      INITIAL_SCALE * 0.5,
                      INITIAL_OFFSET -
                        (windowHeight / 4 - StatusBarManager.HEIGHT),
                      INITIAL_OFFSET - 20,
                    )
                  }
                />
              );
            })}
          </View>
          <View style={styles.resendContainer}>
            <Text style={styles.text}>Didn't received OTP?</Text>
            <View style={styles.resendBtn}>
              <TouchableOpacity onPress={submit}>
                <Text style={styles.resendBtnTxt}>RESEND</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableNativeFeedback
            onPress={submit}
            background={TouchableNativeFeedback.Ripple(
              Colors.primary,
              false,
              rippleRadius,
            )}>
            <View style={styles.button}>
              <Text style={styles.btnText}>VERIFY</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default VerifyPhone;
