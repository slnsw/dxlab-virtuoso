import React from 'react';
import { render } from '@testing-library/react';

import MainTile from '../components/MainTile';

describe('Test', () => {
  it('MainTile shows "Main Tile Title"', () => {
    const { getByText } = render(
      <MainTile title="Main Tile Title" url="/test" />,
    );

    expect(getByText('Main Tile Title')).toBeDefined();
  });
});
