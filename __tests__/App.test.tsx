/**
 * @format
 */

import React from 'react';
import 'react-native';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import { it, jest } from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-splash-screen', () => {
  return {
    hide: () => {
      return {};
    },
  };
});

it('renders correctly', async () => {
  await renderer.create(<App />);
});
