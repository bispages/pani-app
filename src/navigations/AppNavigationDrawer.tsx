import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/Home';
import Colors from '../assets/colors';

const AppDrawer = createDrawerNavigator();

const screenOptions = {
  headerShown: true,
};

const AppNavigationDrawer = () => {
  return (
    <AppDrawer.Navigator
      drawerType="front"
      drawerStyle={{
        backgroundColor: Colors.primary,
      }}
      screenOptions={{ ...screenOptions }}>
      <AppDrawer.Screen name="Home" component={Home} />
    </AppDrawer.Navigator>
  );
};

export default AppNavigationDrawer;
