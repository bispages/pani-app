import React from 'react';
import { useTheme } from 'react-native-paper';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  StackActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import Search from '../screens/Search';
import Profile from '../screens/Profile';
import Bookmarks from '../screens/Bookmarks';
import Settings from '../screens/Settings';
import Support from '../screens/Support';
import DrawerContent from '../screens/Drawer';
import Details from '../screens/Details';
import BackButton from '../components/BackButton';
import EstimateNavigationStack from '../navigations/EstimateNavigationStack';

const AppDrawer = createDrawerNavigator();
const SearchStack = createStackNavigator();

export const SearchNavigationStack = () => {
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
    <SearchStack.Navigator
      headerMode="float"
      screenOptions={{ ...stackScreenOptions }}>
      <SearchStack.Screen
        name="Search"
        component={Search}
        options={{ title: 'Pani App' }}
      />
      <SearchStack.Screen name="Details" component={Details} />
    </SearchStack.Navigator>
  );
};

// This sets the header of different screens inside drawer.
function getDrawerHeaderConfig(route: any, navigation: any) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Pani App';
  switch (routeName) {
    case 'Search':
      return {
        headerTitle: 'Pani App',
      };
    case 'Details':
      return {
        headerTitle: 'Detailed List',
        headerLeft: (props: any) => (
          <BackButton
            {...props}
            onPress={() => navigation.dispatch(StackActions.pop())}
          />
        ),
      };
    case 'MaterialTypes':
      return {
        headerTitle: 'Estimate',
        headerLeft: (props: any) => (
          <BackButton
            {...props}
            onPress={() => navigation.dispatch(StackActions.pop())}
          />
        ),
      };
    case 'MaterialItems':
      return {
        headerTitle: 'Estimate',
        headerLeft: (props: any) => (
          <BackButton
            {...props}
            onPress={() => navigation.dispatch(StackActions.pop())}
          />
        ),
      };
  }
}

const AppNavigationDrawer = () => {
  const { colors } = useTheme();

  return (
    <AppDrawer.Navigator
      drawerType="front"
      initialRouteName="Searchstack"
      sceneContainerStyle={{ flex: 1 }}
      drawerStyle={{ flex: 1 }}
      screenOptions={{
        headerShown: true,
        headerStatusBarHeight: 0,
        headerTintColor: colors.text,
        headerPressColorAndroid: colors.accent,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <AppDrawer.Screen
        name="Searchstack"
        component={SearchNavigationStack}
        options={({ route, navigation }) => ({
          title: 'Pani App',
          ...getDrawerHeaderConfig(route, navigation),
        })}
      />
      <AppDrawer.Screen
        name="EstimateStack"
        component={EstimateNavigationStack}
        options={({ route, navigation }) => ({
          title: 'Estimate',
          ...getDrawerHeaderConfig(route, navigation),
        })}
      />
      <AppDrawer.Screen name="Profile" component={Profile} />
      <AppDrawer.Screen name="Bookmarks" component={Bookmarks} />
      <AppDrawer.Screen name="Settings" component={Settings} />
      <AppDrawer.Screen name="Support" component={Support} />
    </AppDrawer.Navigator>
  );
};

export default AppNavigationDrawer;
