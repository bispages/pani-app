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
import { Provider } from 'react-redux';

import OnBoardingNavigationStack from './src/navigations/OnBoardingNavigationStack';
import configureStore from './src/store';
import Colors from './src/assets/colors';

enableScreens();
const store = configureStore();

const App = () => {
  useEffect(() => {
    (async () => await BootSplash.hide({ fade: true }))();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <OnBoardingNavigationStack />
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default App;
