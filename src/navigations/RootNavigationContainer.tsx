import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from '../screens/Splash';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import AppNavigationDrawer from './AppNavigationDrawer';
import OnBoardingNavigationStack from './OnBoardingNavigationStack';
import { onBoard } from '../store/actions';
import Colors from '../assets/colors';

const RootStack = createStackNavigator();

const RootNavigationContainer = () => {
  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    AsyncStorage.getItem('onboarded').then(value => {
      // if (value !== null && value === '1') dispatch(onBoard());
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
      <RootStack.Navigator screenOptions={{ ...screenOptions }}>
        {isLoggedIn ? (
          <RootStack.Screen name="appdrawer" component={AppNavigationDrawer} />
        ) : (
          <RootStack.Screen
            name="onboardstack"
            component={OnBoardingNavigationStack}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigationContainer;
