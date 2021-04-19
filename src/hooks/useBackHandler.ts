import { useCallback, } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Hook handles exiting the app.
const useBackHandler = () => {
  const backAction = useCallback(() => {
    Alert.alert('Exit app', 'Are you sure you want to exit?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }, []);

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  });
};

export default useBackHandler;