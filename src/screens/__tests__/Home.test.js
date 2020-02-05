import React from 'react';

import render from 'test-utils/render';
import {fireEvent, wait} from '@testing-library/react-native';

import {CommonActions} from '@react-navigation/native';

import Home from 'screens/Home';

const mockListings = [
  {
    listing: {
      propertyDetails: {
        streetNumber: '69',
        street: 'Hosier Lane',
        suburb: 'Melbourne',
        bedrooms: 6,
        bathrooms: 9,
      },
      media: [
        {
          category: 'Image',
          url: 'https://sweetmelbournepics.com.au/hosier-lane.png',
        },
      ],
    },
  },
];

const baseProps = {
  navigation: {
    dispatch: jest.fn(),
  },
  route: {
    params: undefined,
  },
};

const propsWithSuburb = {
  ...baseProps,
  route: {
    params: {
      selectedSuburb: {name: 'Melbourne', state: 'vic', postcode: '3000'},
    },
  },
};

describe('Home', () => {
  test('renders correctly with no listings', () => {
    const {container, queryByText} = render(<Home {...baseProps} />);

    expect(queryByText(/find your dream home/i)).toBeTruthy();

    expect(container).toMatchSnapshot();
  });

  test('displays listings from api when suburb is added to params, then clears listings with button', async () => {
    fetch
      .once(JSON.stringify({access_token: '696969', expires_in: Infinity}))
      .once(JSON.stringify(mockListings));

    const {container, rerender, queryByText, getByText} = render(
      <Home {...baseProps} />,
    );
    rerender(<Home {...propsWithSuburb} />);

    await wait(() => expect(queryByText(/hosier lane/i)).toBeTruthy());

    expect(fetch.mock.calls).toMatchSnapshot();
    expect(container).toMatchSnapshot();

    // dirty hack to get the close icon touchable
    const clearButton = getByText('');
    fireEvent.press(clearButton);

    expect(propsWithSuburb.navigation.dispatch).toBeCalledWith(
      CommonActions.setParams({selectedSuburb: undefined}),
    );
  });
});
