// @flow

import type { State, TransactionStats } from './Store';
import fetchStream from 'fetch-readablestream';
import { TextDecoder } from 'text-encoding';
import * as Immutable from 'immutable';
import type { Map as ImmutableMap }  from 'immutable';

export const BUSY: string = 'BUSY';
export const FETCH_FINISHED: string = 'FETCH_FINISHED';
export const DATA_RECEIVED: string = 'DATA_RECEIVED';

export type Action = {
  type: string,
  data?: boolean | TransactionStats,
};

export type Dispatch = (action: Action) => void | Function;

function readStream(readableStream: Object, dispatch: Dispatch): void {
  const reader = readableStream.getReader();
  const decoder = new TextDecoder("utf-8");

  function pumpBytes(): void {
    return reader.read().then(({ value, done }) => {
      if (done) {
        return;
      }
      /*
        We may have received multiple chunks, so let's split on new-line.
        State is incremental server-side, we only need the last chunk.
      */
      const data: string = decoder.decode(value).trim().split("\n")[0];
      dispatch(dataReceived(Immutable.fromJS(JSON.parse(data))));
      pumpBytes();
    });
  }
  pumpBytes();
}

function fetchTransactionStream(): Function {
  return (dispatch: Dispatch, getState: () => State): Promise<any> => {
    return fetchStream("http://192.168.1.50:8080/get/")
      .then((response) => readStream(response.body, dispatch))
      .then(() => dispatch(transactionStreamDone()))
      .catch(() => dispatch(transactionStreamDone()));
  };
}

export function getTransactionStream(): Function {
  return (dispatch: Dispatch, getState: () => State): ?Function => {
    if (!getState().busy) {
      return dispatch(fetchTransactionStream());
    }
  }
}

export function transactionStreamDone(): Action {
  return {
    type: FETCH_FINISHED,
  };
}

export function dataReceived(data: TransactionStats): Action {
  return {
    type: DATA_RECEIVED,
    data: data
  };
}

export function busy(flag: boolean): Action {
  return {
    type: BUSY,
    data: flag
  };
}
