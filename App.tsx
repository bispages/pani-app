/**
 * Pani App.
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import BootSplash from 'react-native-bootsplash';
import { Provider as StoreProvider } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
  appColors: Colors,
};

const App = () => {
  useEffect(() => {
    (async () => await BootSplash.hide({ fade: true }))();
  }, []);

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <RootNavigationContainer />
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
