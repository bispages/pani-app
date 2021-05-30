import React from 'react';
import { useTheme } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Bookmarks from '../screens/Bookmarks';
import Settings from '../screens/Settings';
import Support from '../screens/Support';
import DrawerContent from '../screens/Drawer';

const AppDrawer = createDrawerNavigator();

const AppNavigationDrawer = () => {
  const { colors } = useTheme();

  return (
    <AppDrawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.text,
        headerPressColorAndroid: colors.accent,
        drawerIcon: ({ color, size }) => (
          <Icon.Button name="menu" size={size} color={color} />
        ),
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <AppDrawer.Screen name="Home" component={Home} />
      <AppDrawer.Screen name="Profile" component={Profile} />
      <AppDrawer.Screen name="Bookmarks" component={Bookmarks} />
      <AppDrawer.Screen name="Settings" component={Settings} />
      <AppDrawer.Screen name="Support" component={Support} />
    </AppDrawer.Navigator>
  );
};

export default AppNavigationDrawer;
