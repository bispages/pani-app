import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import VerifyPhone from '../screens/Login/VerifyPhone';
import UserForm from '../screens/User/UserForm';
import Colors from '../assets/colors';

const OnBoardStack = createStackNavigator();
const LoginStack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: Colors.primary },
  ...TransitionPresets.SlideFromRightIOS,
};

export const LoginNavigationStack = () => (
  <LoginStack.Navigator headerMode="none" screenOptions={{ ...screenOptions }}>
    <LoginStack.Screen name="login" component={Login} />
    <LoginStack.Screen name="verifyphone" component={VerifyPhone} />
    <LoginStack.Screen name="userform" component={UserForm} />
  </LoginStack.Navigator>
);

const OnBoardingNavigationStack = () => (
  <OnBoardStack.Navigator
    headerMode="none"
    screenOptions={{ ...screenOptions }}>
    <OnBoardStack.Screen name="onboard" component={OnBoarding} />
    <OnBoardStack.Screen name="loginstack" component={LoginNavigationStack} />
  </OnBoardStack.Navigator>
);

export default OnBoardingNavigationStack;
