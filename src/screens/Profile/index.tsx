import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './Profile.style';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
    </View>
  );
};

export default Profile;
