import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';

import Estimate from '../screens/Estimate';
import MaterialTypes from '../screens/Estimate/MaterialTypes';
import MaterialItems from '../screens/Estimate/MaterialItems';
import EstimateTableView from '../screens/Estimate/EstimateTableView';
import EstimateForm from '../screens/Estimate/EstimateForm';
import MenuButton from '../components/MenuButton';

const EstimateStack = createStackNavigator();

const EstimateNavigationStack = () => {
  const { colors } = useTheme();
  const stackScreenOptions = () => ({
    headerShown: true,
    headerTintColor: colors.text,
    headerPressColorAndroid: colors.accent,
    headerStyle: {
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    ...TransitionPresets.SlideFromRightIOS,
  });

  return (
    <EstimateStack.Navigator
      headerMode="float"
      screenOptions={stackScreenOptions}>
      <EstimateStack.Screen
        name="Estimate"
        component={Estimate}
        options={({ navigation }) => ({
          headerTitle: 'Estimates',
          headerLeft: () => (
            <MenuButton
              handler={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          ),
        })}
      />
      <EstimateStack.Screen
        name="EstimateForm"
        component={EstimateForm}
        options={{ title: 'Customer Information' }}
      />
      <EstimateStack.Screen
        name="MaterialTypes"
        component={MaterialTypes}
        options={{ title: 'Material Types' }}
      />
      <EstimateStack.Screen
        name="MaterialItems"
        component={MaterialItems}
        options={{ title: 'Material Items' }}
      />
      <EstimateStack.Screen
        name="EstimateTableView"
        component={EstimateTableView}
        options={{ title: 'Final Estimate' }}
      />
    </EstimateStack.Navigator>
  );
};

export default EstimateNavigationStack;
