import React from 'react';
import { View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

const BackButton = (props: any) => {
  const { colors } = useTheme();

  const handlePress = () => {
    props.onPress();
  };

  return (
    <View {...props}>
      <IconButton
        icon="arrow-left"
        color={colors.text}
        size={24}
        rippleColor={colors.accent}
        onPress={handlePress}
      />
    </View>
  );
};

export default BackButton;
