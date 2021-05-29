import { useCallback, FunctionComponent } from 'react';
import { Alert, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Hook handles exiting the app.
const useBackHandler = (backAction: Function | void) => {
  if (!backAction)
    backAction = useCallback(() => {
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

  const cb = () => {
    if (backAction) {
      return backAction();
    }
    return false;
  };

  useFocusEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', cb);
    return () => BackHandler.removeEventListener('hardwareBackPress', cb);
  });
};

export default useBackHandler;
