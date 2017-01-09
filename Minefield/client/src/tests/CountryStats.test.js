import React from 'react';
import CountryStats from '../components/CountryStats.react';
import renderer from 'react-test-renderer';

import { CountryA, StatA } from './TestData';

it('renders ok', () => {
  const tree = renderer.create(
    <CountryStats country={CountryA} data={StatA} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
