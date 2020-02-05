import React from 'react';
import {Platform} from 'react-native';

import render from 'test-utils/render';

import ListingCard from 'components/ListingCard';

const mockListing = {
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
};

describe('ListingCard', () => {
  test('renders listing correctly - ios', () => {
    const {container, queryByText} = render(<ListingCard {...mockListing} />);

    expect(queryByText('69 Hosier Lane')).toBeTruthy();
    expect(queryByText('Melbourne')).toBeTruthy();
    expect(queryByText('6')).toBeTruthy();
    expect(queryByText('9')).toBeTruthy();

    expect(container).toMatchSnapshot();
  });

  test('renders listing correctly - android', () => {
    Platform.OS = 'android';
    const {container, queryByText} = render(<ListingCard {...mockListing} />);

    expect(queryByText('69 Hosier Lane')).toBeTruthy();
    expect(queryByText('Melbourne')).toBeTruthy();
    expect(queryByText('6')).toBeNull();
    expect(queryByText('9')).toBeNull();

    expect(container).toMatchSnapshot();
  });
});
