import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { EstimateFormValues } from '../../types';
import { addCustomer } from '../../store/actions';
import styles from './Estimate.style';

const EstimateForm = () => {
  const dispatch = useDispatch();
  const { dark, colors } = useTheme();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [pincode, setPincode] = useState('');
  const formVal: EstimateFormValues = useSelector(
    (state: RootState) => state.estimate,
  );
  const { customer } = formVal;

  const createEstimate = () => {
    dispatch(addCustomer({ name, area, mobile, pincode }));
    navigation.navigate('MaterialTypes');
  };

  return (
    <View style={[styles.panelButtonContainer]}>
      <View style={[styles.panelTextContainer]}>
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
                background: dark ? colors.background : colors.primary,
              },
            }}
            underlineColor={dark ? colors.background : colors.primary}
            style={[styles.textInput]}
            keyboardType="default"
            maxLength={40}
            onChangeText={(text: string) => setName(text)}
            defaultValue={customer.name}
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
                background: dark ? colors.background : colors.primary,
              },
            }}
            underlineColor={dark ? colors.background : colors.primary}
            style={[styles.textInput]}
            keyboardType="default"
            maxLength={40}
            onChangeText={(text: string) => setArea(text)}
            defaultValue={customer.area}
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
                background: dark ? colors.background : colors.primary,
              },
            }}
            underlineColor={dark ? colors.background : colors.primary}
            style={[styles.textInput]}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={(text: string) => setMobile(text)}
            defaultValue={customer.mobile}
            value={mobile}
            autoCorrect={false}
            autoCompleteType="tel"
            returnKeyType="next"
            textAlign="left"
            textContentType="telephoneNumber"
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
                background: dark ? colors.background : colors.primary,
              },
            }}
            underlineColor={dark ? colors.background : colors.primary}
            style={[styles.textInput]}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={(text: string) => setPincode(text)}
            defaultValue={customer.pincode}
            value={pincode}
            autoCorrect={false}
            autoCompleteType="postal-code"
            returnKeyType="next"
            textAlign="left"
            textContentType="postalCode"
          />
        </View>
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

export default EstimateForm;