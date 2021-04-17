import React, { ReactElement } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image, View, Text, ImageSourcePropType } from 'react-native';
import { useSelector } from 'react-redux';
import { material } from 'react-native-typography';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

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
    backgroundColor: Colors.onboardOne,
  },
  {
    key: 2,
    title: 'Know the App',
    text: 'Other cool stuff',
    image: require('../../assets/img/onboardscreenimg2.png'),
    backgroundColor: Colors.onboardTwo,
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "Let's Start",
    image: require('../../assets/img/onboardscreenimg3.png'),
    backgroundColor: Colors.onboardThree,
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
  const { onBoarded } = useSelector((state: RootState) => state.onboard);

  const renderItems = ({ item }: { item: Item }) => {
    return (
      <LinearGradient
        colors={[item.backgroundColor, Colors.white]}
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
      <View style={styles.buttonRounded}>
        <Text style={material.body1White}>Skip</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="checkmark-outline"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // TODO
  };

  if (onBoarded) {
    // Go directly to login screen.
    return <View />;
  }

  return (
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
