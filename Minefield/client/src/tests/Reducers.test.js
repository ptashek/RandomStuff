import reduxApp, { initialState } from '../redux/Reducers';
import { TestTransactionList, TestTransactionStatsA, TestTransactionStatsB} from './TestData';

it('correctly reduces state with invalid action', () => {
  let outState = reduxApp(undefined, { type: 'INVALID' });
  expect(outState).toEqual(initialState);

  outState = reduxApp(initialState, { type: 'INVALID' });
  expect(outState).toEqual(initialState);
});

it('correctly reduces state: data received, no initial state', () => {
  const reducedState = { ...initialState, data: TestTransactionList };
  const outState = reduxApp(
    undefined,
    { type: 'DATA_RECEIVED', data: TestTransactionList }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: data received, with initial state', () => {
  const reducedState = { ...initialState, data: TestTransactionList };
  const outState = reduxApp(
    { ...initialState, data: TestTransactionList },
    { type: 'DATA_RECEIVED', data: TestTransactionList }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: busy, no initial state', () => {
  const reducedState = { ...initialState, busy: false };
  const outState = reduxApp(
    undefined,
    { type: 'BUSY', data: false }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: busy, with initial state', () => {
  const reducedState = { ...initialState, busy: true };
  const outState = reduxApp(
    initialState,
    { type: 'BUSY', data: true }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: fetch done, no initial state', () => {
  const reducedState = { ...initialState, busy: false };
  const outState = reduxApp(
    undefined,
    { type: 'FETCH_FINISHED' }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: fetch done, with initial state', () => {
  const reducedState = { ...initialState, busy: false };
  const outState = reduxApp(
    initialState,
    { type: 'FETCH_FINISHED' }
  );
  expect(outState).toEqual(reducedState);
});
