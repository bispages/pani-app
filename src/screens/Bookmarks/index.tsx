import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './Bookmarks.style';

const Bookmarks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bookmarks</Text>
    </View>
  );
};

export default Bookmarks;
