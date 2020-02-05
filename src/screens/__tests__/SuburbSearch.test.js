import React from 'react';

import render from 'test-utils/render';
import {fireEvent, wait} from '@testing-library/react-native';

import {CommonActions} from '@react-navigation/native';

import SuburbSearch from 'screens/SuburbSearch';

const mockLocations = [
  {
    type: 'suburb',
    name: 'Melbourne',
    region: 'Greater Melbourne',
    postcode: '3000',
    state: 'vic',
  },
  {
    type: 'some-random-type',
    name: 'NotASuburb',
    region: 'FooBar',
    postcode: '6969',
    state: 'vic',
  },
  {
    type: 'suburb',
    name: 'NotASuburb',
    region: 'FizzBuzz',
    postcode: '6969',
    state: 'not-vic',
  },
];

const baseProps = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
  },
};

describe('SuburbSearch', () => {
  test('search and select a suburb', async () => {
    fetch
      .once(JSON.stringify({access_token: '696969', expires_in: Infinity}))
      .once(JSON.stringify(mockLocations));

    const {
      container,
      queryByText,
      getByPlaceholderText,
      getByLabelText,
    } = render(<SuburbSearch {...baseProps} />);

    expect(queryByText(/melbourne/i)).toBeNull();

    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'Mel burn');

    await wait(() => expect(queryByText(/greater melbourne/i)).toBeTruthy());
    expect(queryByText(/notasuburb/i)).toBeNull();
    expect(fetch.mock.calls).toMatchSnapshot();
    expect(container).toMatchSnapshot();

    const suburb = getByLabelText('select Melbourne');
    fireEvent.press(suburb);

    expect(baseProps.navigation.dispatch).toBeCalledWith({
      ...CommonActions.setParams({selectedSuburb: mockLocations[0]}),
      source: 'mock-key-0',
    });
    expect(baseProps.navigation.goBack).toBeCalled();
  });
});
