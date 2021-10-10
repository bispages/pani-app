import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from './Estimate.style';

const Estimate = () => {
  const { dark, colors } = useTheme();
  const navigation = useNavigation();

  const createEstimate = () => {
    navigation.navigate('MaterialTypes');
  };

  return (
    <View style={[styles.panelButtonContainer]}>
      <View style={[styles.panelButtonView]}>
        <Button
          dark
          loading={false}
          mode="contained"
          onPress={createEstimate}
          contentStyle={styles.panelButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          START
        </Button>
      </View>
    </View>
  );
};

export default Estimate;
