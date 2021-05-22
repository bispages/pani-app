import React, { ReactElement, useCallback, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useBackHandler from '../../hooks/useBackHandler';
import { onBoard } from '../../store/actions';
import { RootState } from '../../store';
import styles from './OnBoarding.style';
import Colors from '../../assets/colors';
import OnBoardOne from '../../assets/img/onboardscreenimg1.svg';
import OnBoardTwo from '../../assets/img/onboardscreenimg2.svg';
import OnBoardThree from '../../assets/img/onboardscreenimg3.svg';

// Onboarding Slides.
const slides = [
  {
    key: 'OnBoardOne',
    title: 'Need Materials?',
    text:
      'Select needed items from list and order it with your favourite shop or nearby shop',
    image: (
      <View style={styles.image}>
        <OnBoardOne />
      </View>
    ),
    backgroundColor: Colors.onBoardOne,
  },
  {
    key: 'OnBoardTwo',
    title: 'Need Tradesman?',
    text: 'Search for nearby technicians and laborers',
    image: (
      <View style={styles.image}>
        <OnBoardTwo />
      </View>
    ),
    backgroundColor: Colors.onBoardTwo,
  },
  {
    key: 'OnBoardThree',
    title: 'Need Material Estimate?',
    text: 'Select the number of materials and get estimate with just a click',
    image: (
      <View style={styles.image}>
        <OnBoardThree />
      </View>
    ),
    backgroundColor: Colors.onBoardThree,
  },
];

type Item = {
  key: string;
  title: string;
  text: string;
  image: ReactElement;
  backgroundColor: string;
};

const OnBoarding = (): ReactElement => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { onBoarded } = useSelector((state: RootState) => state.onboard);

  // Adds BackHandler hook.
  useBackHandler();

  const navigateToLogin = useCallback(() => {
    navigation.navigate('loginstack');
  }, [navigation]);

  useEffect(() => {
    // If user already onBoarded navigate to login.
    if (onBoarded) navigateToLogin();
  }, []);

  const renderItems = ({ item }: { item: Item }) => {
    return (
      <LinearGradient
        locations={[0, 0.99]}
        colors={[item.backgroundColor, Colors.naturalTwo]}
        style={[styles.slide]}>
        <View style={styles.imageContainer}>{item.image}</View>
        <Text style={[styles.title]}>{item.title}</Text>
        <Text style={[styles.text]}>{item.text}</Text>
      </LinearGradient>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-right" color={Colors.white} size={24} />
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.skip}>
        <Text style={styles.skipTxt}>Skip</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={[styles.buttonCircle, styles.greenBtn]}>
        <Icon name="check" color={Colors.white} size={24} />
      </View>
    );
  };

  const onDone = () => {
    // User finished the introduction. Save this and show login.
    dispatch(onBoard());
    AsyncStorage.setItem('onboarded', '1').then(() => {
      navigateToLogin();
    });
  };

  return onBoarded ? (
    <View style={styles.slide} />
  ) : (
    <AppIntroSlider
      showSkipButton
      renderItem={renderItems}
      data={slides}
      onDone={onDone}
      dotStyle={styles.dotStyle}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      renderDoneButton={renderDoneButton}
      activeDotStyle={styles.activeDotStyle}
    />
  );
};

export default OnBoarding;
