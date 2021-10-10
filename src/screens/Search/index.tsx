import React, { ComponentProps, FC, useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import styles from './Search.style';
import { ItemList } from '../../types';
import SearchBar from '../../components/SearchBar';
import SectionCards from '../../components/SectionCards';
import WelcomeText from '../../components/WelcomeText';

// Cards List to show in order.
const cardsList = [
  {
    id: 'welcometext',
    name: 'WelcomeText',
  },
  {
    id: 'searchbar',
    name: 'SearchBar',
  },
  {
    id: '0',
    name: 'Near Me',
  },
  {
    id: '-1',
    name: 'Popular',
  },
  {
    id: '-2',
    name: 'Top Services',
  },
];

const Search = (props: ComponentProps<FC>) => {
  const navigation = useNavigation();
  const { dark, colors } = useTheme();
  const searchRef = useRef<FlatList>(null);
  const [refreshing, setRefreshing] = useState(false);

  //Function to go to any index of list.
  const goToIndex = (index: number) => {
    if (searchRef.current) {
      searchRef.current?.scrollToIndex({ index });
    }
  };

  // Function to call the api for search.
  const search = (text: string | '') => {};

  // Function to go to respective sections.
  const goToSection = (item?: ItemList) => {
    if (item !== undefined && searchRef.current) {
      navigation.navigate('Details', { item });
    }
  };

  // Functin to renderSearch Screen Items.
  const renderSearchScreenItems = ({
    item,
    index,
  }: {
    item: ItemList;
    index: number;
  }) => {
    if (index < 2) {
      return index > 0 ? (
        <SearchBar searchFunc={search} goToSection={goToSection} {...props} />
      ) : (
        <WelcomeText {...props} />
      );
    }
    return <SectionCards card={item} {...props} />;
  };

  // Function that handles pull to refresh.
  const getDataCards = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  // Function for footer component.
  const renderFooterComponent = () => {
    return (
      <View style={[styles.goToTopButtonView]}>
        <Button
          dark
          loading={false}
          mode="outlined"
          icon="arrow-up"
          onPress={() => goToIndex(0)}
          contentStyle={styles.goToTopButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          TOP
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={searchRef}
        data={cardsList}
        extraData={[dark]}
        initialNumToRender={5}
        onRefresh={getDataCards}
        refreshing={refreshing}
        progressViewOffset={1}
        renderItem={renderSearchScreenItems}
        stickyHeaderIndices={[1]}
        ListFooterComponent={renderFooterComponent}
      />
    </View>
  );
};

export default Search;
