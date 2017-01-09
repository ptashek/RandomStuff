import React from 'react';
import CurrencyPairStats from '../components/CurrencyPairStats.react';
import renderer from 'react-test-renderer';

import { PairA, TestTransactionList } from './TestData';

it('renders ok', () => {
  const tree = renderer.create(
    <CurrencyPairStats currencyPair={PairA} data={TestTransactionList.get(PairA)} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
