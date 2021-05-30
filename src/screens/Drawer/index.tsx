import React from 'react';
import { View } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Drawer.style';
import ThemeContext from '../../components/Context';
import { RootState } from '../../store';
import { User } from '../../types';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const {
    state: { routeNames, index },
    navigation,
  } = props;
  const { dark, colors } = useTheme();
  const { toggleTheme } = React.useContext(ThemeContext);
  const { user }: { user: User } = useSelector(
    (state: RootState) => state.user,
  );

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              {user?.image?.path ? (
                <Avatar.Image source={{ uri: user?.image?.path }} size={60} />
              ) : (
                <Avatar.Icon size={60} icon="account-circle" />
              )}
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>John Doe</Title>
                <Caption style={styles.caption}>@j_doe</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              focused={routeNames[index] === 'Home'}
              activeTintColor={colors.primary}
              activeBackgroundColor={colors.accent}
              label="Home"
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              focused={routeNames[index] === 'Profile'}
              activeTintColor={colors.primary}
              activeBackgroundColor={colors.accent}
              label="Profile"
              onPress={() => {
                navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              focused={routeNames[index] === 'Bookmarks'}
              activeTintColor={colors.primary}
              activeBackgroundColor={colors.accent}
              label="Bookmarks"
              onPress={() => {
                navigation.navigate('Bookmarks');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="cog-outline" color={color} size={size} />
              )}
              focused={routeNames[index] === 'Settings'}
              activeTintColor={colors.primary}
              activeBackgroundColor={colors.accent}
              label="Settings"
              onPress={() => {
                navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              focused={routeNames[index] === 'Support'}
              activeTintColor={colors.primary}
              activeBackgroundColor={colors.accent}
              label="Support"
              onPress={() => {
                navigation.navigate('Support');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={toggleTheme}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {}}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
