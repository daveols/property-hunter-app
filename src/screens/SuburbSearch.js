import React, {useState} from 'react';
import {useNavigationState, CommonActions} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {Searchbar, ActivityIndicator, List} from 'react-native-paper';

import {useSuburbSearch} from '../hooks';

const SuburbSearch = ({navigation, ...rest}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const routes = useNavigationState(state => state.routes);
  console.log(routes);

  const {
    search: searchSuburbs,
    loading: isLoadingSuburbs,
    suburbs,
  } = useSuburbSearch();

  const handleChangeSearchTerm = term => {
    setSearchTerm(term);
    searchSuburbs(term);
  };

  const setSelectedSuburb = suburb => {
    const previousRouteKey = routes[routes.length - 2].key;
    navigation.dispatch({
      ...CommonActions.setParams({selectedSuburb: suburb}),
      source: previousRouteKey,
    });
    navigation.goBack();
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        autoFocus
        icon={isLoadingSuburbs ? () => <ActivityIndicator /> : null}
        value={searchTerm}
        onChangeText={handleChangeSearchTerm}
      />
      <FlatList
        data={suburbs}
        renderItem={({item: suburb}) => (
          <List.Item
            title={suburb.name}
            description={`${suburb.region}, ${suburb.postcode}`}
            onPress={() => setSelectedSuburb(suburb)}
          />
        )}
        keyExtractor={(_, i) => `suburb-${i}`}
        keyboardShouldPersistTaps="handled"
      />
    </>
  );
};

export default SuburbSearch;
