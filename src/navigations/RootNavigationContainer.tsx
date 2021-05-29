import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from '../screens/Splash';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import AppNavigationDrawer from './AppNavigationDrawer';
import OnBoardingNavigationStack, {
  LoginNavigationStack,
} from './OnBoardingNavigationStack';
import { onBoard } from '../store/actions';
import Colors from '../assets/colors';
import { RootState } from '../store';

const RootStack = createStackNavigator();

const RootNavigationContainer = () => {
  const dispatch = useDispatch();
  const { onBoarded } = useSelector((state: RootState) => state.onboard);
  const { login } = useSelector((state: RootState) => state.auth);

  const { loading, user } = useIsLoggedIn();

  useEffect(() => {
    AsyncStorage.getItem('onboarded').then(value => {
      if (value !== null && value === '1') {
        dispatch(onBoard());
      }
    });
  }, []);

  const screenOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: Colors.primary },
    ...TransitionPresets.ScaleFromCenterAndroid,
  };

  return loading ? (
    <Splash />
  ) : (
    <NavigationContainer>
      {user || login ? (
        <AppNavigationDrawer />
      ) : (
        <RootStack.Navigator screenOptions={{ ...screenOptions }}>
          {onBoarded ? (
            <RootStack.Screen
              name="loginstack"
              component={LoginNavigationStack}
            />
          ) : (
            <RootStack.Screen
              name="onboardstack"
              component={OnBoardingNavigationStack}
            />
          )}
        </RootStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
