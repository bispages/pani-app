import React, { ComponentProps, FC } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const WelcomeText = (props: ComponentProps<FC>) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-start',
        backgroundColor: colors.primary,
      }}>
      <Text style={{ fontWeight: '700', fontSize: 28 }}>Welcome,</Text>
      <Text style={{ fontWeight: '200', fontSize: 12 }}>
        Find Tradesmen for your need!
      </Text>
    </View>
  );
};

export default WelcomeText;
