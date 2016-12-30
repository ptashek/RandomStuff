// @flow

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxApp from './Reducers';

export type Post = {
  userId: number,
  id: number,
  title: string,
  body: string,
};

export type Comment = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

export type State = {
  activePost: number,
  // $FlowFixMe - union type in action data definition
  posts: Array<Post>,
  comments: Object,
  busy: boolean,
};

export const store = createStore(
  reduxApp,
  applyMiddleware(thunk)
);
