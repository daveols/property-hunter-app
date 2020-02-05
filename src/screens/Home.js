import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';

import {StyleSheet, FlatList} from 'react-native';
import {Chip, Subheading, ActivityIndicator} from 'react-native-paper';

import {useListingsNearSuburbSearch} from '../hooks';

import ListingCard from '../components/ListingCard';

const Home = ({navigation, route: {params}}) => {
  const {
    search: searchListings,
    loading: isLoadingListings,
    listings,
  } = useListingsNearSuburbSearch();

  const selectedSuburb =
    params && params.selectedSuburb ? params.selectedSuburb : undefined;

  useEffect(() => {
    searchListings(selectedSuburb);
  }, [searchListings, selectedSuburb]);

  const clearSuburb = () => {
    navigation.dispatch(CommonActions.setParams({selectedSuburb: undefined}));
  };

  return (
    <>
      {selectedSuburb ? (
        <>
          <Chip onClose={clearSuburb} style={styles.suburb}>
            {selectedSuburb.name}
          </Chip>
          {isLoadingListings ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={listings}
              renderItem={({item}) => <ListingCard {...item.listing} />}
              keyExtractor={(_, i) => `listing-${i}`}
            />
          )}
        </>
      ) : (
        <Subheading style={styles.noSuburbHeadline}>
          Search for a suburb to find your nearby dream home!
        </Subheading>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  suburb: {
    alignSelf: 'flex-start',
    margin: 16,
  },
  noSuburbHeadline: {
    alignSelf: 'center',
    textAlign: 'center',
    margin: 16,
    marginTop: 64,
  },
});

export default Home;
