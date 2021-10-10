import React, { ComponentProps, FC, useState } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

import styles from './SearchBar.style';
import CategoryListScroll from '../CategoryListScroll';

const SearchBar = (
  props: ComponentProps<FC> & { searchFunc: Function; goToSection: Function },
) => {
  const { searchFunc, goToSection } = props;
  const { dark, colors, appColors } = useTheme();
  const [searchKey, setSearchKey] = useState('');

  return (
    <View style={[styles.searchContainer, { backgroundColor: colors.primary }]}>
      <View style={[styles.inputContainer]}>
        <TextInput
          mode="flat"
          placeholder="Search Laborer"
          value={searchKey}
          style={styles.input}
          selectionColor={dark ? colors.primary : colors.text}
          underlineColor="transparent"
          underlineColorAndroid="transparent"
          right={
            <TextInput.Icon
              onPress={() => searchFunc(searchKey)}
              color={dark ? colors.primary : colors.text}
              name="magnify"
            />
          }
          theme={{
            roundness: 10,
            colors: {
              text: dark ? colors.primary : colors.text,
              background: dark ? appColors.white : colors.background,
            },
          }}
          onChangeText={text => setSearchKey(text)}
        />
      </View>
      <CategoryListScroll {...props} />
    </View>
  );
};

export default SearchBar;
