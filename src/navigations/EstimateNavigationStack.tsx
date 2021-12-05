import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

import Estimate from '../screens/Estimate';
import MaterialTypes from '../screens/Estimate/MaterialTypes';
import MaterialItems from '../screens/Estimate/MaterialItems';
import EstimateTableView from '../screens/Estimate/EstimateTableView';

const EstimateStack = createStackNavigator();

const EstimateNavigationStack = () => {
  const { colors } = useTheme();
  const stackScreenOptions = {
    headerShown: false,
    headerTintColor: colors.text,
    headerPressColorAndroid: colors.accent,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    ...TransitionPresets.SlideFromRightIOS,
  };

  return (
    <EstimateStack.Navigator
      headerMode="float"
      screenOptions={{ ...stackScreenOptions }}>
      <EstimateStack.Screen
        name="Estimate"
        component={Estimate}
        options={{ title: 'Estimate' }}
      />
      <EstimateStack.Screen name="MaterialTypes" component={MaterialTypes} />
      <EstimateStack.Screen name="MaterialItems" component={MaterialItems} />
      <EstimateStack.Screen
        name="EstimateTableView"
        component={EstimateTableView}
      />
    </EstimateStack.Navigator>
  );
};

export default EstimateNavigationStack;
