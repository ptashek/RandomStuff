// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxApp from './Reducers';
import type { Map as ImmutableMap } from 'immutable';

/* Just an alias */
export type TransactionStats = ImmutableMap<any, any>;

export type State = {
  data: TransactionStats,
  busy: boolean,
};

export const store = createStore(
  reduxApp,
  applyMiddleware(thunk)
);
