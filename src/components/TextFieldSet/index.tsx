import React from 'react';
import { View, Text, TextInput, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../assets/colors';

const TextFieldSet = (props: {
  legend: string;
  preText?: string;
  icon?: string;
  fieldSetStyles: ViewStyle[];
  legendStyles: ViewStyle[];
  preTextStyles: ViewStyle[];
  textInputStyles: TextStyle[];
  textInputProps: {};
}) => {
  const {
    fieldSetStyles,
    legend,
    legendStyles,
    preText,
    preTextStyles,
    icon,
    textInputProps,
    textInputStyles,
  } = props;

  return (
    <View style={fieldSetStyles}>
      <Text style={legendStyles}>{legend}</Text>
      {icon !== undefined ? (
        <Icon
          name={icon}
          color={Colors.secondary}
          size={24}
          style={preTextStyles}
        />
      ) : (
        <Text style={preTextStyles}>{preText}</Text>
      )}
      <TextInput {...textInputProps} style={textInputStyles} />
    </View>
  );
};

export default TextFieldSet;
