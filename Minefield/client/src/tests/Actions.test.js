import * as actions from '../redux/Actions';
import { TestTransactionList, TestTransactionStatsA, TestTransactionStatsB} from './TestData';

/**
 * Skipping async action creator tests
 * http://redux.js.org/docs/recipes/WritingTests.html#async-action-creators
**/
it('busy works ok', () => {
  const { BUSY, busy } = actions;
  const retTrue = {
    type: BUSY,
    data: true,
  };
  const retFalse = {
    type: BUSY,
    data: false,
  };

  expect(busy(true)).toEqual(retTrue);
  expect(busy(false)).toEqual(retFalse);
});

it('data received ok', () => {
  const { DATA_RECEIVED, dataReceived } = actions;
  const expectedReturn = {
    type: DATA_RECEIVED,
    data: TestTransactionList,
  };

  expect(dataReceived(TestTransactionList)).toEqual(expectedReturn);
});

it('data done ok', () => {
  const { FETCH_FINISHED, transactionStreamDone } = actions;
  const expectedReturn = {
    type: FETCH_FINISHED,
  };

  expect(transactionStreamDone()).toEqual(expectedReturn);
});
