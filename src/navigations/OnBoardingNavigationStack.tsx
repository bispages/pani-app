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
import Colors from '../assets/colors';

const onBoardStack = createStackNavigator();

const OnBoardingNavigationStack = () => (
  <NavigationContainer>
    <onBoardStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: { backgroundColor: Colors.primary },
        transitionSpec: {
          open: TransitionSpecs.RevealFromBottomAndroidSpec,
          close: TransitionSpecs.RevealFromBottomAndroidSpec,
        },
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
      }}>
      <onBoardStack.Screen name="splash" component={Splash} />
      <onBoardStack.Screen name="onboard" component={OnBoarding} />
      <onBoardStack.Screen
        name="login"
        component={Login}
        options={{
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
    </onBoardStack.Navigator>
  </NavigationContainer>
);

export default OnBoardingNavigationStack;
