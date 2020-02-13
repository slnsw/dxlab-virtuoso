import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import HomePage from '../pages/index';

describe('HomePage', () => {
  it('renders home page content', () => {
    const { getByText } = render(
      <MockedProvider>
        <HomePage />
      </MockedProvider>,
    );
  });
});
