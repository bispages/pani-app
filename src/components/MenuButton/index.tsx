import React from 'react';
import { View } from 'react-native';
import { TouchableRipple, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ComponentProps = {
  handler: Function;
};

const MenuButton = ({ handler }: ComponentProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: 40,
        height: 40,
        marginLeft: 6,
        borderRadius: 40,
        overflow: 'hidden',
      }}>
      <TouchableRipple
        borderless
        centered={true}
        rippleColor={colors.accent}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handler()}>
        <Icon name="menu" color={colors.text} size={28} />
      </TouchableRipple>
    </View>
  );
};

export default MenuButton;
