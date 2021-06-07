import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './Settings.style';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
    </View>
  );
};

export default Settings;
