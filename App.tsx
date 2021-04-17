/**
 * Pani App.
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import BootSplash from 'react-native-bootsplash';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Splash from './src/screens/Splash';
import OnBoarding from './src/screens/OnBoarding';
import configureStore from './src/store';
import Colors from './src/assets/colors';

enableScreens();
const { store, persistor } = configureStore();

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    BootSplash.hide({ fade: true }).then(() => {
      // TODO
      // Here we consider login side effects.
      setTimeout(() => {
        setIsReady(true);
      }, 3000);
    });
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Splash />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OnBoarding />
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default App;
