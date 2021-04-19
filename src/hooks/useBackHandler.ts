import { useEffect, useCallback } from 'react';
import { Alert, BackHandler } from 'react-native';

// Hook handles exiting the app.
const useBackHandler = () => {
  const backAction = useCallback(() => {
    Alert.alert('Exit app', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
};

export default useBackHandler;