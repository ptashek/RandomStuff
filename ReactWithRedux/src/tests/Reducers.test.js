import reduxApp, { initialState } from '../redux/Reducers';

import { TestPost, TestComment, TestPostList, TestCommentList } from './TestData';

it('correctly reduces state with invalid action', () => {
  let outState = reduxApp(undefined, { type: 'INVALID' });
  expect(outState).toEqual(initialState);

  outState = reduxApp(initialState, { type: 'INVALID' });
  expect(outState).toEqual(initialState);
});

it('correctly reduces state: post list, no initial state', () => {
  const reducedState = { ...initialState, posts: TestPostList };
  const outState = reduxApp(
    undefined,
    { type: 'POST_LIST_SUCCESS', data: TestPostList }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: post list, with initial state', () => {
  const reducedState = { ...initialState, posts: TestPostList };
  const outState = reduxApp(
    { ...initialState, posts: [TestPost, TestPost, TestPost] },
    { type: 'POST_LIST_SUCCESS', data: TestPostList }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: comment list, no initial state', () => {
  const outState = reduxApp(
    undefined,
    { type: 'COMMENT_LIST_SUCCESS', data: TestCommentList }
  );
  expect(outState).toEqual(initialState);
});

it('correctly reduces state: comment list, with initial state', () => {
  const reducedState = { ...initialState, activePost: 1, comments: {1: TestCommentList} };
  const outState = reduxApp(
    { ...initialState, activePost: 1 },
    { type: 'COMMENT_LIST_SUCCESS', data: TestCommentList }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: active post, no initial state', () => {
  const reducedState = { ...initialState, activePost: 1};
  const outState = reduxApp(
    undefined,
    { type: 'ACTIVE_POST', data: 1 }
  );
  expect(outState).toEqual(reducedState);
});

it('correctly reduces state: active post, with initial state', () => {
  const reducedState = { ...initialState, activePost: 1};
  const outState = reduxApp(
    initialState,
    { type: 'ACTIVE_POST', data: 1 }
  );
  expect(outState).toEqual(reducedState);
});
