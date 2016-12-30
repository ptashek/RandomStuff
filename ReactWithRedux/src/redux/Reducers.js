// @flow

// import { List, Map } from 'immutable';
import type { Action } from './Actions';
import { BUSY, ACTIVE_POST, POST_LIST_SUCCESS, COMMENT_LIST_SUCCESS } from './Actions';
import type { Comment, State } from './Store';

export const initialState: State = {
  activePost: -1,
  posts: [],
  comments: {},
  busy: false,
};

function reduxApp(state: State = initialState, action: Action): State {
  switch (action.type) {
    case POST_LIST_SUCCESS:
      return { ...state, posts: action.data };

    case COMMENT_LIST_SUCCESS:
      if (state.activePost === initialState.activePost) {
        return state;
      }
      const comments = Object.assign({}, state.comments);
      comments[state.activePost] = action.data;
      return { ...state, comments: comments };

    case ACTIVE_POST:
      // $FlowFixMe - trust the action code to send correct data
      return { ...state, activePost: action.data };

    default:
      return state;
  }
}

export default reduxApp;
