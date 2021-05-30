/**
 * Pani App.
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
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
    background: Colors.white,
    text: Colors.dark,
  },
  appColors: Colors,
};

const defaultTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary,
    background: Colors.background,
    disabled: Colors.disabled,
    placeholder: Colors.greyfriendTwo,
    text: Colors.white,
    error: Colors.error,
    card: Colors.dark,
  },
  appColors: Colors,
};

const App = () => {
  const [isLightTheme, setIsLightTheme] = React.useState(false);
  const theme = isLightTheme ? lightTheme : defaultTheme;

  useEffect(() => {
    (async () => await BootSplash.hide({ fade: true }))();
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.dark} barStyle="light-content" />
          <RootNavigationContainer theme={theme} />
        </View>
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
