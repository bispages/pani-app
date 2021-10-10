import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { MaterialType } from '../../types';
import { materialTypesList } from '../../utils/materialTypesList';
import styles from './Estimate.style';

const MaterialTypes = () => {
  const { dark, colors } = useTheme();
  const navigation = useNavigation();

  const moveToMaterialItemSelect = (type: MaterialType) => {
    setTimeout(() => {
      navigation.navigate('MaterialItems', { type });
    }, 20);
  };

  // Function to render material Types List.
  const renderMaterialTypesList = (item: MaterialType) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => moveToMaterialItemSelect(item)}
        style={[styles.block, { backgroundColor: colors.text }]}
        android_ripple={{ color: colors.background, radius: 200 }}>
        <Text
          style={{ fontSize: 14 }}
          theme={{ colors: { text: colors.background } }}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Select Material Types</Text>
      </View>
      <View style={styles.itemsContainer}>
        {materialTypesList ? (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.listContainer}>
                {materialTypesList.map(renderMaterialTypesList)}
              </View>
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default MaterialTypes;
