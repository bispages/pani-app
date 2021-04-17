import React, { ReactElement, useCallback, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image, View, Text, ImageSourcePropType } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { material } from 'react-native-typography';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { onBoard } from '../../store/actions';
import { RootState } from '../../store';
import styles from './OnBoarding.style';
import Colors from '../../assets/colors';

// Onboarding Slides.
const slides = [
  {
    key: 1,
    title: 'Welcome',
    text: 'Description.Say something cool',
    image: require('../../assets/img/onboardscreenimg1.png'),
    backgroundColor: Colors.shadeOne,
  },
  {
    key: 2,
    title: 'Know the App',
    text: 'Other cool stuff',
    image: require('../../assets/img/onboardscreenimg2.png'),
    backgroundColor: Colors.shadeTwo,
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "Let's Start",
    image: require('../../assets/img/onboardscreenimg3.png'),
    backgroundColor: Colors.shadeThree,
  },
];

type Item = {
  key: number;
  title: string;
  text: string;
  image: ImageSourcePropType;
  backgroundColor: string;
};

const OnBoarding = (): ReactElement => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { onBoarded } = useSelector((state: RootState) => state.onboard);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('login');
  }, [navigation]);

  useEffect(() => {
    // If user already onBoarded navigate to login.
    if (onBoarded) navigateToLogin();
  }, []);

  const renderItems = ({ item }: { item: Item }) => {
    return (
      <LinearGradient
        locations={[0, 0.99]}
        colors={[Colors.primary, Colors.naturalTwo]}
        style={[styles.slide]}>
        <Text style={[styles.title, material.headline]}>{item.title}</Text>
        <View style={styles.imageContainer}>
          <Image source={item.image} />
        </View>
        <Text style={[styles.text, material.subheading]}>{item.text}</Text>
      </LinearGradient>
    );
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-forward-outline" color={Colors.white} size={24} />
      </View>
    );
  };

  const renderSkipButton = () => {
    return (
      <View style={styles.skip}>
        <Text style={[material.body1, { color: Colors.secondary }]}>Skip</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={[styles.buttonCircle, styles.greenBtn]}>
        <Icon name="checkmark-outline" color={Colors.white} size={24} />
      </View>
    );
  };

  const onDone = () => {
    // User finished the introduction. Save this and show login.
    dispatch(onBoard());
    navigateToLogin();
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
