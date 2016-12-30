// @flow

import type { Post, State } from './Store';

export const BUSY: string = 'BUSY';

export const POST_LIST_REQUEST: string = 'POST_LIST_REQUEST';
export const POST_LIST_SUCCESS: string = 'POST_LIST_SUCCESS';

export const COMMENT_LIST_REQUEST: string = 'COMMENT_LIST_REQUEST';
export const COMMENT_LIST_SUCCESS: string = 'COMMENT_LIST_SUCCESS';

export const ACTIVE_POST: string = 'ACTIVE_POST';

export type Action = {
  type: string,
  data?: number | Array<Post | Comment>,
};

export type Dispatch = (action: Action) => void | Function;

function hasComments(state: State): boolean {
    return state.comments[state.activePost] != undefined;
}

function fetchPostList(): Function {
  return (dispatch: Dispatch, getState: () => State): Promise<any> => {
    return fetch("http://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(data => dispatch(postListReady(data)));
  };
}

function fetchCommentList(): Function {
  return (dispatch: Dispatch, getState: () => State): Promise<any> => {
    return fetch("http://jsonplaceholder.typicode.com/comments?postId=" + getState().activePost)
      .then(response => response.json())
      .then(data => dispatch(commentListReady(data)));
  };
}

export function getPostList(): Function {
  return (dispatch: Dispatch, getState: () => State): ?Function => {
    if (getState().posts.length == 0) {
      return dispatch(fetchPostList());
    }
  }
}

export function postListReady(posts: Array<Post>): Action {
  return {
    type: POST_LIST_SUCCESS,
    data: posts,
  };
}

export function getCommentList(): Function {
  return (dispatch: Dispatch, getState: () => State): ?Function => {
    if (getState().activePost != -1) {
      return dispatch(fetchCommentList());
    }
  }
}

export function commentListReady(comments: Array<Comment>): Action {
  return {
    type: COMMENT_LIST_SUCCESS,
    data: comments,
  };
}

export function setActivePost(postId: number): Action {
  return {
    type: ACTIVE_POST,
    data: postId,
  };
}
