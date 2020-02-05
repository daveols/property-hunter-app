import React, {useState, useEffect, useCallback} from 'react';

import {useAppState} from 'react-native-hooks';

import querystring from 'querystring';
import {encode as btoa} from 'base-64';

// const CLIENT_KEY = 'client_a368a89e8edf072518d02c827162f5e9';
// const SECRET_KEY = 'secret_4a4f05f1a3fb14b7268147a2add66ce2';
const CLIENT_KEY = 'client_e7ad612e01855261995ff0cfa65202b4';
const SECRET_KEY = 'secret_b7914b696182dac38c6a7581a9b58c26';

const AUTH_ENDPOINT = 'https://auth.domain.com.au/v1/connect/token';
const REQUIRED_SCOPES = 'api_listings_read';

const DomainAuthContext = React.createContext({});

const fetchAccessToken = () => {
  const options = {
    method: 'POST',
    headers: {
      authorization: `Basic ${btoa(`${CLIENT_KEY}:${SECRET_KEY}`)}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'client_credentials',
      scope: REQUIRED_SCOPES,
    }),
  };
  return fetch(AUTH_ENDPOINT, options);
};

const DomainAuthProvider = ({children}) => {
  const [token, setToken] = useState();
  const [tokenExpiry, setTokenExpiry] = useState(0);

  const getAccessToken = useCallback(async () => {
    if (tokenExpiry < Date.now()) {
      const response = await fetchAccessToken();
      if (response.ok) {
        const {
          access_token: accessToken,
          expires_in: expiresInSeconds,
        } = await response.json();
        setToken(accessToken);
        setTokenExpiry(Date.now() + expiresInSeconds * 1000);
        return accessToken;
      } else {
        throw new Error('Failed to get access token');
      }
    }
    return token;
  }, [token, tokenExpiry]);

  const authenticatedFetch = useCallback(
    async (url, options = {}) => {
      const accessToken = await getAccessToken();
      const defaultHeaders = {
        authorization: `Bearer ${accessToken}`,
      };
      const headers = options.headers
        ? {
            ...defaultHeaders,
            ...options.headers,
          }
        : defaultHeaders;
      console.log('FETCH - ', url, options, headers);
      return fetch(url, {...options, headers});
    },
    [getAccessToken],
  );

  console.log('token', token);

  return (
    <DomainAuthContext.Provider
      value={{
        authenticatedFetch,
        isAuthed: tokenExpiry > Date.now(),
      }}>
      {children}
    </DomainAuthContext.Provider>
  );
};

export {DomainAuthContext, DomainAuthProvider};
