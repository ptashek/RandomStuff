import * as Immutable from 'immutable';

export const StatA = Immutable.fromJS({
  transactionCount: 10,
  avgExchangeRate: 1.5,
  avgTransactionSize: 100,
});

export const StatB = Immutable.fromJS({
  transactionCount: 100,
  avgExchangeRate: 0.9,
  avgTransactionSize: 15,
});

export const CountryA = "IE";
export const CountryB = "UK";

export const TestTransactionStatsA = new Immutable.Map().asMutable();
TestTransactionStatsA.set(CountryA, StatA);

export const TestTransactionStatsB = new Immutable.Map().asMutable();
TestTransactionStatsB.set(CountryB, StatB);

export const PairA = "EUR/USD";
export const PairB = "EUR/GBP";

export const TestTransactionList = new Immutable.Map().asMutable();
TestTransactionList.set(PairA, TestTransactionStatsA.asImmutable());
TestTransactionList.set(PairB, TestTransactionStatsB.asImmutable());
