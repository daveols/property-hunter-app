import {useState, useCallback} from 'react';

import {useDomainAPI} from './useDomainAPI';

const RESIDENTIAL_SEARCH_ENDPOINT = '/v1/listings/residential/_search';

export const useListingsNearSuburbSearch = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  const {post} = useDomainAPI();

  const search = useCallback(
    async suburb => {
      if (!suburb) {
        return setListings([]);
      }

      const searchTerms = {
        listingType: 'Sale',
        locations: [
          {
            state: suburb.state.toUpperCase(),
            suburb: suburb.name,
            postCode: suburb.postcode,
            includeSurroundingSuburbs: true,
          },
        ],
      };

      setLoading(true);
      try {
        const response = await post(
          `${RESIDENTIAL_SEARCH_ENDPOINT}`,
          searchTerms,
        );
        const data = await response.json();
        if (response.ok) {
          const validListings = data.filter(
            item => item && item.listing && item.listing.propertyDetails,
          );
          setListings(validListings);
        } else {
          throw data;
        }
      } catch (e) {
        console.log('Error searching residential listings:', e);
      } finally {
        setLoading(false);
      }
    },
    [post],
  );

  return {search, listings, loading};
};
