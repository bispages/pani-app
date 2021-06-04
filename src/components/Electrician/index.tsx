import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import styles from './Electrician.style';

const Electrician = () => {
  const { colors } = useTheme();

  const findElectricalShop = () => {};
  const findElectrician = () => {};
  const createEstimate = () => {};

  return (
    <View style={[styles.panelButtonContainer]}>
      <View style={[styles.panelButtonView]}>
        <Button
          dark
          loading={false}
          mode="contained"
          onPress={findElectricalShop}
          contentStyle={styles.panelButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          FIND AN ELECTRICAL SHOP
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
          onPress={findElectrician}
          contentStyle={styles.panelButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          FIND AN ELECTRICIAN
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

export default Electrician;
