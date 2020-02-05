import React from 'react';

import render from 'test-utils/render';
import {fireEvent} from '@testing-library/react-native';

import Header from 'components/Header';

const baseProps = {
  scene: {
    descriptor: {
      options: {},
    },
    route: {
      name: 'Awesome App',
    },
  },
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
};

describe('Header', () => {
  beforeEach(() => jest.resetAllMocks());

  test('matches snapshot', () => {
    const {container, getAllByRole} = render(<Header {...baseProps} />);

    expect(getAllByRole('header')[0]).toHaveTextContent('Awesome App');
    expect(container).toMatchSnapshot();
  });

  test('back button shows when previous route exists', () => {
    const props = {
      ...baseProps,
      previous: {},
    };
    const {queryByLabelText} = render(<Header {...props} />);

    expect(queryByLabelText('Back')).toMatchSnapshot();
  });

  test('renders right icons and fires correct navigation event when pressed', () => {
    const rightIcons = [
      {
        icon: 'magnify',
        navTo: 'TestScreen',
      },
    ];
    const props = {
      ...baseProps,
      scene: {
        ...baseProps.scene,
        descriptor: {
          options: {
            rightIcons,
          },
        },
      },
    };
    const {getAllByRole} = render(<Header {...props} />);

    const icon = getAllByRole('button')[0];
    fireEvent.press(icon);

    expect(baseProps.navigation.navigate).toBeCalledWith('TestScreen');
  });
});
