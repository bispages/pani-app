import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './Estimate.style';

const Estimate = () => {
  const { dark, colors } = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [mobileNo, setMobile] = useState('');
  const [pincode, setPincode] = useState('');

  const createEstimate = () => {
    navigation.navigate('MaterialTypes');
  };

  return (
    <View style={[styles.panelButtonContainer]}>
      <View style={[styles.textContainer]}>
        <TextInput
          mode="flat"
          label="Customer Name"
          left={
            <TextInput.Icon
              name="account-outline"
              style={styles.preText}
              color={colors.accent}
            />
          }
          theme={{
            colors: {
              primary: colors.accent,
              text: colors.primary,
              background: colors.text,
            },
          }}
          style={[styles.textInput]}
          keyboardType="default"
          maxLength={40}
          onChangeText={(text: string) => setName(text)}
          defaultValue={name}
          value={name}
          autoCorrect={false}
          autoCompleteType="name"
          returnKeyType="next"
          textAlign="left"
          textContentType="name"
        />
      </View>
      <View style={[styles.textContainer]}>
        <TextInput
          mode="flat"
          label="Area"
          left={
            <TextInput.Icon
              name="home-outline"
              style={styles.preText}
              color={colors.accent}
            />
          }
          theme={{
            colors: {
              primary: colors.accent,
              text: colors.primary,
              background: colors.text,
            },
          }}
          style={[styles.textInput]}
          keyboardType="default"
          maxLength={40}
          onChangeText={(text: string) => setArea(text)}
          defaultValue={area}
          value={area}
          autoCorrect={false}
          autoCompleteType="street-address"
          returnKeyType="next"
          textAlign="left"
          textContentType="location"
        />
      </View>
      <View style={[styles.textContainer]}>
        <TextInput
          mode="flat"
          label="Mobile Number"
          left={
            <TextInput.Icon
              name="phone-plus-outline"
              style={styles.preText}
              color={colors.accent}
            />
          }
          theme={{
            colors: {
              primary: colors.accent,
              text: colors.primary,
              background: colors.text,
            },
          }}
          style={[styles.textInput]}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={(text: string) => setMobile(text)}
          defaultValue={mobileNo}
          value={mobileNo}
          autoCorrect={false}
          autoCompleteType="postal-code"
          returnKeyType="next"
          textAlign="left"
          textContentType="postalCode"
        />
      </View>
      <View style={[styles.textContainer]}>
        <TextInput
          mode="flat"
          label="Pincode"
          left={
            <TextInput.Icon
              name="map-marker-outline"
              style={styles.preText}
              color={colors.accent}
            />
          }
          theme={{
            colors: {
              primary: colors.accent,
              text: colors.primary,
              background: colors.text,
            },
          }}
          style={[styles.textInput]}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={(text: string) => setPincode(text)}
          defaultValue={pincode}
          value={pincode}
          autoCorrect={false}
          autoCompleteType="postal-code"
          returnKeyType="next"
          textAlign="left"
          textContentType="postalCode"
        />
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
          START
        </Button>
      </View>
    </View>
  );
};

export default Estimate;
