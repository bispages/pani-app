import React from 'react';
import { useTheme } from 'react-native-paper';
// import {
//   createStackNavigator,
//   TransitionPresets,
// } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// import Search from '../screens/Search';
import Profile from '../screens/Profile';
// import Bookmarks from '../screens/Bookmarks';
// import Settings from '../screens/Settings';
import Support from '../screens/Support';
import DrawerContent from '../screens/Drawer';
// import Details from '../screens/Details';
import EstimateNavigationStack from '../navigations/EstimateNavigationStack';

const AppDrawer = createDrawerNavigator();
// const SearchStack = createStackNavigator();

// export const SearchNavigationStack = () => {
//   const { colors } = useTheme();
//   const stackScreenOptions = {
//     headerShown: false,
//     headerTintColor: colors.text,
//     headerPressColorAndroid: colors.accent,
//     headerStyle: {
//       elevation: 0,
//       shadowOpacity: 0,
//       borderBottomWidth: 0,
//     },
//     ...TransitionPresets.SlideFromRightIOS,
//   };

//   return (
//     <SearchStack.Navigator
//       headerMode="float"
//       screenOptions={{ ...stackScreenOptions }}>
//       <SearchStack.Screen
//         name="Search"
//         component={Search}
//         options={{ title: 'Pani App' }}
//       />
//       <SearchStack.Screen name="Details" component={Details} />
//     </SearchStack.Navigator>
//   );
// };

const AppNavigationDrawer = () => {
  const { colors } = useTheme();

  return (
    <AppDrawer.Navigator
      drawerType="front"
      initialRouteName="Searchstack"
      sceneContainerStyle={{ flex: 1 }}
      drawerStyle={{ flex: 1 }}
      screenOptions={{
        headerShown: false,
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
      {/* <AppDrawer.Screen
        name="Searchstack"
        component={SearchNavigationStack}
        options={({ route, navigation }) => ({
          title: 'Pani App',
          ...getDrawerHeaderConfig(route, navigation),
        })}
      /> */}
      <AppDrawer.Screen
        name="EstimateStack"
        component={EstimateNavigationStack}
      />
      <AppDrawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
        }}
      />
      {/* <AppDrawer.Screen name="Bookmarks" component={Bookmarks} /> */}
      {/* <AppDrawer.Screen name="Settings" component={Settings} /> */}
      <AppDrawer.Screen
        name="Support"
        component={Support}
        options={{
          headerShown: true,
        }}
      />
    </AppDrawer.Navigator>
  );
};

export default AppNavigationDrawer;
