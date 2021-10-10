import React from 'react';
import { View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import styles from './Electrician.style';

const Electrician = () => {
  const { colors } = useTheme();

  const findHardwareShop = () => {};
  const findPlumber = () => {};

  return (
    <View style={[styles.panelButtonContainer]}>
      <View style={[styles.panelButtonView]}>
        <Button
          dark
          loading={false}
          mode="contained"
          onPress={findHardwareShop}
          contentStyle={styles.panelButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          FIND AN ELECTRICAL SHOP
        </Button>
      </View>
      <View style={[styles.panelButtonView]}>
        <Button
          dark
          loading={false}
          mode="contained"
          onPress={findPlumber}
          contentStyle={styles.panelButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          FIND AN ELECTRICIAN
        </Button>
      </View>
    </View>
  );
};

export default Electrician;
