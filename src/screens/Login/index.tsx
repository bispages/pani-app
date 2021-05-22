import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Keyboard,
  NativeModules,
  useWindowDimensions,
} from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import useBackHandler from '../../hooks/useBackHandler';
import Colors from '../../assets/colors';
import styles from './Login.style';
import LoginPhone from '../../assets/img/loginphone.svg';

const Login = () => {
  const INITIAL_SCALE = 1;
  const INITIAL_OFFSET = 0;
  const { appColors } = useTheme();
  const navigation = useNavigation();
  const { StatusBarManager } = NativeModules;
  const windowHeight = useWindowDimensions().height;
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [generateOTPDisabled, setGenerateOTPDisabled] = useState(true);
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

  const submit = () => {
    // TODO sideEffects dispatch.
    navigation.navigate('verifyphone', { phone });
  };

  const onTextChange = (text: string) => {
    setPhone(text.replace(/[^0-9]/g, ''));
  };

  const acceptTerms = (isChecked?: boolean): void => {
    Keyboard.dismiss();
    if (isChecked !== undefined) setTermsAccepted(isChecked);
    else setTermsAccepted(false);
  };

  useEffect(() => {
    setGenerateOTPDisabled(!(termsAccepted && phone.length === 10));
  }, [termsAccepted, phone]);

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
          <Text style={[styles.heading]}>Enter your phone number</Text>
          <Text style={[styles.subHeading]}>
            We will send you the 4 digit verification code
          </Text>
        </View>
        <View style={[styles.inputset]}>
          <TextInput
            mode="outlined"
            label="Mobile Number"
            left={
              <TextInput.Affix
                text="+91"
                textStyle={styles.preText}
                theme={{
                  colors: {
                    primary: appColors.primary,
                  },
                }}
              />
            }
            theme={{
              colors: {
                primary: appColors.secondary,
                text: appColors.primary,
                background: appColors.white,
              },
            }}
            style={[styles.textInput]}
            keyboardType="phone-pad"
            maxLength={10}
            onChangeText={text => onTextChange(text)}
            defaultValue={phone}
            value={phone}
            autoCorrect={false}
            autoCompleteType="tel"
            returnKeyType="done"
            textAlign="left"
            textContentType="telephoneNumber"
          />
        </View>
        <BouncyCheckbox
          size={18}
          fillColor={Colors.secondary}
          unfillColor="transparent"
          text="I accept the terms and conditions."
          onPress={acceptTerms}
          style={styles.checkboxContainer}
          textStyle={styles.textStyle}
          iconStyle={styles.iconStyle}
        />
        <View style={styles.btnContainer}>
          <Button
            dark
            loading={false}
            mode="contained"
            disabled={generateOTPDisabled}
            onPress={submit}
            contentStyle={styles.button}
            theme={{
              colors: {
                primary: appColors.secondary,
              },
            }}>
            GENERATE OTP
          </Button>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default Login;
