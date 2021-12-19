import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Keyboard,
  useWindowDimensions,
  Pressable,
  StyleSheet,
  Linking,
} from 'react-native';
import {
  TextInput,
  Text,
  Button,
  useTheme,
  Checkbox,
  Snackbar
} from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import useBackHandler from '../../hooks/useBackHandler';
import styles from './Login.style';
import LoginPhone from '../../assets/img/loginphone.svg';
import { BISPAGES_TERMS_CONDITION_URL } from '../../utils/constants';

const Login = () => {
  const INITIAL_SCALE = 1;
  const INITIAL_OFFSET = 0;
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState('');
  const checkboxView = useRef<Animatable.View & View>(null);
  const { colors, appColors } = useTheme();
  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;
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
    offsetImage.value = withTiming(offsetImageValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    scale.value = withTiming(scaleValue, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    offsetView.value = withTiming(offsetViewValue, {
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

  const acceptTerms = (): void => {
    Keyboard.dismiss();
    setTermsAccepted(!termsAccepted);
    if (checkboxView.current?.bounceIn) checkboxView.current.bounceIn(400);
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

  const keyboardDidHide = () => {
    Keyboard.dismiss();
    scaleImage(INITIAL_SCALE, INITIAL_OFFSET, INITIAL_OFFSET);
  };

  const keyboardDidShow = () =>
    scaleImage(0.5, -windowHeight * 0.12, -windowHeight * 0.03);

  const onDismissSnackBar = () => {
    setShowSnack(false);
    setMessage('');
  };

  const openTerms = useCallback(async () => {
    const supported = await Linking.canOpenURL(BISPAGES_TERMS_CONDITION_URL);
    if (supported) {
      await Linking.openURL(BISPAGES_TERMS_CONDITION_URL);
    } else {
      setMessage(`Don't know how to open this URL: ${BISPAGES_TERMS_CONDITION_URL}`);
      setShowSnack(true);
    }
  }, []);

  return (
    <View style={[styles.login]}>
      <Animated.View style={[styles.image, animatedImageTranslateStyles]}>
        <Animated.View style={[{ width: '100%' }, animatedScaleStyles]}>
          <LoginPhone width="90%" height="90%" />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.avoidView, animatedTranslateStyles]}>
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              width: windowWidth,
              height: windowWidth * 2,
              borderRadius: 40,
              backgroundColor: '#f7f7f7',
              transform: [{ translateY: -windowWidth * 0.07 }],
            },
          ]}
        />
        <View style={styles.headline}>
          <Text
            style={[styles.heading]}
            theme={{ colors: { text: colors.primary } }}>
            Let's set your phone number
          </Text>
          <Text
            style={[styles.subHeading]}
            theme={{ colors: { text: colors.primary } }}>
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
                textStyle={[
                  styles.preText,
                  { borderRightColor: appColors.greyfriendTwo },
                ]}
                theme={{
                  colors: {
                    text: colors.primary,
                  },
                }}
              />
            }
            theme={{
              colors: {
                primary: colors.accent,
                text: colors.primary,
                background: colors.text,
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
        <View style={[styles.checkboxContainer]}>
          <Text
            dataDetectorType={"link"}
            onPress={openTerms}
            style={[styles.textStyle, { fontSize: 12.5, textDecorationLine: 'underline' }]}
            theme={{ colors: { text: appColors.secondary } }}>
            {`Privacy & Terms of Service`}
          </Text>
        </View>
        <Animatable.View ref={checkboxView} style={[styles.checkboxContainer]}>
          <Checkbox
            status={termsAccepted ? 'checked' : 'unchecked'}
            onPress={acceptTerms}
            uncheckedColor={appColors.greyfriendTwo}
            color={appColors.secondary}
          />
          <Pressable style={[styles.termsAcceptedText]} onPress={acceptTerms}>
            <Text
              style={[styles.textStyle]}
              theme={{ colors: { text: colors.primary } }}>
              I accept the terms and conditions.
            </Text>
          </Pressable>
        </Animatable.View>
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
                primary: colors.accent,
              },
            }}>
            GENERATE OTP
          </Button>
        </View>
      </Animated.View>
      <Snackbar
        visible={showSnack}
        duration={1000}
        onDismiss={onDismissSnackBar}
        theme={{
          colors: { surface: colors.text, onSurface: colors.error },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

export default Login;
