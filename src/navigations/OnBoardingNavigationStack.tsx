import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
  TransitionPresets,
} from '@react-navigation/stack';

import Splash from '../screens/Splash';
import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import VerifyPhone from '../screens/Login/VerifyPhone';
import Colors from '../assets/colors';

const OnBoardStack = createStackNavigator();
const LoginStack = createStackNavigator();

const screenOptions = {
  cardStyle: { backgroundColor: Colors.primary },
  transitionSpec: {
    open: TransitionSpecs.RevealFromBottomAndroidSpec,
    close: TransitionSpecs.RevealFromBottomAndroidSpec,
  },
  cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
};

const LoginNavigationStack = () => (
  <LoginStack.Navigator headerMode="none" screenOptions={{ ...screenOptions }}>
    <LoginStack.Screen
      name="login"
      component={Login}
      options={{
        ...TransitionPresets.ScaleFromCenterAndroid,
      }}
    />
    <LoginStack.Screen name="verifyphone" component={VerifyPhone} />
  </LoginStack.Navigator>
);

const OnBoardingNavigationStack = () => (
  <NavigationContainer>
    <OnBoardStack.Navigator
      headerMode="none"
      screenOptions={{ ...screenOptions }}>
      <OnBoardStack.Screen name="splash" component={Splash} />
      <OnBoardStack.Screen name="onboard" component={OnBoarding} />
      <OnBoardStack.Screen name="loginstack" component={LoginNavigationStack} />
    </OnBoardStack.Navigator>
  </NavigationContainer>
);

export default OnBoardingNavigationStack;
