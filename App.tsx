/**
 * Pani App.
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useMemo } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import BootSplash from 'react-native-bootsplash';
import { Provider as StoreProvider } from 'react-redux';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemeContext from './src/components/Context';
import RootNavigationContainer from './src/navigations/RootNavigationContainer';
import configureStore from './src/store';
import Colors from './src/assets/colors';

enableScreens();
const store = configureStore();

declare global {
  namespace ReactNativePaper {
    interface Theme {
      appColors: typeof Colors;
    }
  }
}

const lightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: Colors.white,
    accent: Colors.primary,
    background: Colors.background,
    disabled: Colors.disabled,
    placeholder: Colors.greyfriendTwo,
    text: Colors.dark,
    error: Colors.error,
    card: Colors.white,
  },
  appColors: Colors,
};

const defaultTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: Colors.dark,
    accent: Colors.secondary,
    background: Colors.primary,
    disabled: Colors.disabled,
    placeholder: Colors.greyfriendTwo,
    text: Colors.white,
    error: Colors.error,
    card: Colors.dark,
    surface: Colors.primary,
  },
  appColors: Colors,
};

const App = () => {
  let userTheme = false;
  AsyncStorage.getItem('theme').then(value => {
    userTheme = value ? JSON.parse(value).isLightTheme : false;
    setIsLightTheme(userTheme);
  });
  const [isLightTheme, setIsLightTheme] = React.useState(userTheme);
  const theme = isLightTheme ? lightTheme : defaultTheme;

  useEffect(() => {
    (async () => await BootSplash.hide({ fade: true }))();
  }, []);

  const themeContext = useMemo(
    () => ({
      toggleTheme: () => {
        AsyncStorage.setItem(
          'theme',
          JSON.stringify({ isLightTheme: !isLightTheme }),
        ).then(() => {
          setIsLightTheme(!isLightTheme);
        });
      },
    }),
    [isLightTheme],
  );

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <ThemeContext.Provider value={themeContext}>
          <View style={styles.container}>
            <StatusBar backgroundColor={Colors.dark} barStyle="light-content" />
            <RootNavigationContainer theme={theme} />
          </View>
        </ThemeContext.Provider>
      </PaperProvider>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default App;
