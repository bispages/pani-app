import React from 'react';
import { View } from 'react-native';
import { Text, FAB, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from './Estimate.style';
import EmptyList from '../../assets/img/empty_list.svg';

const Estimate = () => {
  const { colors, appColors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.panelButtonContainer]}>
      <View
        style={{
          flex: 0.4,
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <EmptyList width="70%" height="70%" />
      </View>
      <View
        style={{
          flex: 0.6,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
            theme={{ colors: { text: colors.text } }}>
            It seems you haven't added any estimate.
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
          }}>
          <Text
            style={{ fontSize: 14, textAlign: 'center' }}
            theme={{ colors: { text: colors.text } }}>
            No estimates found. Start adding estimates.
          </Text>
        </View>
      </View>
      <FAB
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
        }}
        color={appColors.white}
        icon="plus"
        onPress={() => navigation.navigate('EstimateForm')}
      />
    </View>
  );
};

export default Estimate;
