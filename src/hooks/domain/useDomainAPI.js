import {useContext, useCallback} from 'react';
import {DomainAuthContext} from '../../contexts/DomainAuthContext';

const DOMAIN_BASE_URL = 'https://api.domain.com.au';

export const useDomainAPI = () => {
  const {authenticatedFetch} = useContext(DomainAuthContext);

  const get = useCallback(
    (endpoint, options = {}) => {
      const url = DOMAIN_BASE_URL + endpoint;
      return authenticatedFetch(url, {...options, method: 'GET'});
    },
    [authenticatedFetch],
  );

  const post = useCallback(
    (endpoint, data, options = {}) => {
      const url = DOMAIN_BASE_URL + endpoint;
      const defaultHeaders = {
        'Content-Type': 'application/json',
      };

      const headers = options.headers
        ? {
            ...defaultHeaders,
            ...options.headers,
          }
        : defaultHeaders;
      return authenticatedFetch(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      });
    },
    [authenticatedFetch],
  );

  return {get, post};
};
