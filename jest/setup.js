/* global jest */
import '@testing-library/jest-native/extend-expect';
require('jest-fetch-mock').enableMocks();

jest.mock('@react-navigation/native', () => {
  const reactNavigationNative = require.requireActual(
    '@react-navigation/native',
  );

  const mockState = {
    routes: [{key: 'mock-key-0'}, {key: 'mock-key-1'}],
  };

  return {
    ...reactNavigationNative,
    useNavigationState: selector => selector(mockState),
  };
});
