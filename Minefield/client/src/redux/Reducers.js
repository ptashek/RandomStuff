// @flow

import type { Action } from './Actions';
import { BUSY, DATA_RECEIVED, FETCH_FINISHED } from './Actions';
import type { State } from './Store';
import { Map } from 'immutable';

export const initialState: State = {
  data: new Map(),
  busy: false,
};

function reduxApp(state: State = initialState, action: Action): State {
  switch (action.type) {
    case DATA_RECEIVED:
      // $FlowFixMe union type on State.data
      return { ...state, data: action.data };

    case BUSY:
    // $FlowFixMe union type on State.data
      return { ...state, busy: action.data };

    case FETCH_FINISHED:
      return { ...state, busy: false };

    default:
      return state;
  }
}

export default reduxApp;
