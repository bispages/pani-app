/**
 * Pani App.
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useMemo, useState } from 'react';
import { useColorScheme, StatusBar, StyleSheet, ColorSchemeName } from 'react-native';
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
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

type AppTheme = string | ColorSchemeName;

const App = () => {
  let userTheme: AppTheme = useColorScheme();
  const [theme, setTheme] = useState(userTheme);
  const appTheme = theme === 'light' ? lightTheme : defaultTheme;

  console.log(theme);

  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem('theme').then((value) => {
        userTheme = value ? value : (userTheme || 'dark');
        setTheme(userTheme);
      });
      await BootSplash.hide({ fade: true })
    }
    )();
  }, []);

  const themeContext = useMemo(
    () => ({
      toggleTheme: () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        AsyncStorage.setItem('theme', newTheme).then(() => {
          setTheme(newTheme);
        });
      },
    }),
    [theme],
  );

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={appTheme}>
        <ThemeContext.Provider value={themeContext}>
          <SafeAreaProvider style={styles.container}>
            <StatusBar backgroundColor={Colors.dark} barStyle="light-content" />
            <RootNavigationContainer theme={appTheme} />
          </SafeAreaProvider>
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
