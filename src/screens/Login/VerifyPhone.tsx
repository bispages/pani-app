import React, {
  useEffect,
  useReducer,
  createRef,
  RefObject,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  NativeModules,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  TextInput as PaperTextInput,
  Button,
  useTheme,
} from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { login } from '../../store/actions';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
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

type routeParams = {
  route: { params: { phone: string } };
};

const VerifyPhone = ({ route: { params } }: routeParams) => {
  const INITIAL_SCALE = 1;
  const INITIAL_OFFSET = 0;
  const { phone } = params;
  const navigation = useNavigation();
  const { StatusBarManager } = NativeModules;
  const windowHeight = useWindowDimensions().height;
  const scale = useSharedValue(INITIAL_SCALE);
  const offsetView = useSharedValue(INITIAL_OFFSET);
  const offsetImage = useSharedValue(INITIAL_OFFSET);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [verifyActionDisabled, setVerifyActionDisabled] = useState(true);
  const refs: RefObject<TextInput>[] = [];
  const { colors, appColors } = useTheme();
  const dispatchAction = useDispatch();
  const { user } = useIsLoggedIn();

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
    if (!verifyActionDisabled) Keyboard.dismiss();
  }, [verifyActionDisabled]);

  useEffect(() => {
    // Keyboard events.
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
    };
  }, []);

  const keyboardDidHide = () =>
    scaleImage(INITIAL_SCALE, INITIAL_OFFSET, INITIAL_OFFSET);

  const keyboardDidShow = () =>
    scaleImage(
      INITIAL_SCALE * 0.5,
      INITIAL_OFFSET - (windowHeight / 4 - StatusBarManager.HEIGHT),
      INITIAL_OFFSET - 20,
    );

  const onTextChange = (key: string, text: string, index: number) => {
    const val = text.replace(/[^0-9]/g, '');
    dispatch({ type: key, value: val });
    if (index < 3 && '' !== val) refs[index + 1].current?.focus();
  };

  const isVerifyActionDisabled = useCallback(() => {
    const isFilled = Object.keys(initialState).filter(key => state[key] === '')
      .length;
    setVerifyActionDisabled(isFilled > 0);
  }, [state]);

  useEffect(() => {
    isVerifyActionDisabled();
  }, [state]);

  const resend = () => null;

  const verify = () => {
    const loginUser = { phone };
    // TODO - Here we need to check user is already there or not by calling api.
    // Remove user check from hook and call api.
    if (user === null) {
      navigation.navigate('userform', { phone });
    } else {
      dispatchAction(login(loginUser));
    }
  };

  return (
    <LinearGradient
      locations={[0, 0.99]}
      colors={[appColors.loginBg, appColors.naturalTwo]}
      style={[styles.login]}>
      <Animated.View style={[styles.image, animatedImageTranslateStyles]}>
        <Animated.View style={[{ width: '100%' }, animatedScaleStyles]}>
          <Verifyphone width="100%" height="90%" />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.avoidView, animatedTranslateStyles]}>
        <View style={styles.headline}>
          <Text style={[styles.heading]}>OTP Verification</Text>
          <View style={[styles.phoneVerifyContainer]}>
            <Text style={[styles.subHeading]}>Enter the OTP sent to</Text>
            <Text style={[styles.phonenum]}>{`+91 ${phone}`}</Text>
          </View>
        </View>
        <View style={styles.inputsetContainer}>
          <View style={styles.codeContainer}>
            {Object.keys(initialState).map((key, index) => {
              const newRef = createRef<TextInput>();
              refs.push(newRef);
              return (
                <PaperTextInput
                  key={key}
                  ref={newRef}
                  mode="outlined"
                  theme={{
                    colors: {
                      primary: colors.accent,
                      text: colors.primary,
                      background: colors.text,
                    },
                  }}
                  style={[styles.otpTextInput]}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={text => onTextChange(key, text, index)}
                  defaultValue={state[key]}
                  value={state[key]}
                  autoCorrect={false}
                  returnKeyType={key === 'code4' ? 'done' : 'next'}
                  textAlign="center"
                  textContentType="oneTimeCode"
                />
              );
            })}
          </View>
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't received OTP?</Text>
            <View style={styles.resendBtn}>
              <TouchableOpacity onPress={resend}>
                <Text style={[styles.resendBtnTxt, { color: colors.accent }]}>
                  RESEND
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            dark
            loading={false}
            mode="contained"
            disabled={verifyActionDisabled}
            onPress={verify}
            contentStyle={styles.button}
            theme={{
              colors: {
                primary: appColors.secondary,
              },
            }}>
            VERIFY
          </Button>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default VerifyPhone;
