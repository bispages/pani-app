import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.dispatch(state => {
      // Remove all other routes from the stack so that user cannot go back.
      const routes = state.routes.filter(r => r.name === 'login');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  }, []);

  return <View />;
};

export default Login;
