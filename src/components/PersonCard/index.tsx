import React from 'react';
import { View } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';
import { ItemList } from '../../types';

import styles from './PersonCard.style';

const PersonCard = ({ data }: { data: ItemList }) => {
  const { colors, appColors } = useTheme();

  return (
    <Card
      elevation={1}
      theme={{ roundness: 10 }}
      style={{
        overflow: 'hidden',
        marginHorizontal: 5,
        width: 200,
        height: 150,
      }}>
      <Card.Content
        style={[styles.personContainer, { backgroundColor: colors.text }]}>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{ fontWeight: '700', fontSize: 18 }}
            theme={{ colors: { text: colors.background } }}>
            {data.name}
          </Text>
        </View>
        <View style={[styles.cardContainer]}></View>
      </Card.Content>
    </Card>
  );
};

export default PersonCard;
