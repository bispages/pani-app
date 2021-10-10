import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from './Plumber.style';

const Plumber = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const findHardwareShop = () => {};
  const findPlumber = () => {};
  const createEstimate = () => {
    navigation.navigate('Estimate');
  };

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
          FIND AN HARDWARE SHOP
        </Button>
        {/* <Pressable
          onPress={findElectricalShop}
          android_ripple={{
            color: colors.text,
            borderless: false,
            radius: 400,
          }}>
          <Text>FIND AN ELECTRICAL SHOP</Text>
        </Pressable> */}
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
          FIND A PLUMBER
        </Button>
      </View>
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
          CREATE AN ESTIMATE
        </Button>
      </View>
    </View>
  );
};

export default Plumber;
