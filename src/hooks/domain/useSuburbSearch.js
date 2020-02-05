import {useState, useCallback} from 'react';

import {useDebouncedCallback} from 'use-debounce';
import {useDomainAPI} from './useDomainAPI';

import querystring from 'querystring';

const LOCATION_SEARCH_ENDPOINT = '/v1/listings/locations';

const DEBOUNCE_SEARCH_MS = 1000;

export const useSuburbSearch = () => {
  const [suburbs, setSuburbs] = useState([]);
  const [searchCache, setSearchCache] = useState({});
  const [loading, setLoading] = useState(false);

  const {get} = useDomainAPI();

  const rawSearch = useCallback(
    async term => {
      try {
        const response = await get(
          `${LOCATION_SEARCH_ENDPOINT}?${querystring.stringify({terms: term})}`,
        );
        const data = await response.json();
        if (response.ok) {
          const victorianSuburbs = data.filter(
            l => l.type === 'suburb' && l.state === 'vic',
          );
          setSuburbs(victorianSuburbs);
          setSearchCache({...searchCache, [term]: victorianSuburbs});
        } else {
          throw data;
        }
      } catch (e) {
        console.log('Error searching suburbs:', e);
      } finally {
        setLoading(false);
      }
    },
    [get, searchCache],
  );

  const [debouncedSearch] = useDebouncedCallback(rawSearch, DEBOUNCE_SEARCH_MS);

  const search = useCallback(
    term => {
      if (!term) {
        return setSuburbs([]);
      }
      const normalizedTerm = term.trim().toLowerCase();
      const cachedLocations = searchCache[normalizedTerm];
      if (cachedLocations) {
        setSuburbs(searchCache[normalizedTerm]);
      } else {
        setLoading(true);
        debouncedSearch(normalizedTerm);
      }
    },
    [debouncedSearch, searchCache],
  );

  return {search, suburbs, loading};
};
