import React from 'react';
import {render} from '@testing-library/react-native';

import {DomainAuthProvider} from 'contexts/DomainAuthContext';

export default (ui, {...options} = {}) => {
  const Providers = ({children}) => (
    <DomainAuthProvider>{children}</DomainAuthProvider>
  );

  return {...render(ui, {wrapper: Providers, ...options})};
};
