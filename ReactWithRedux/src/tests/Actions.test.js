import * as actions from '../redux/Actions';
import { TestPost, TestComment, TestPostList, TestCommentList } from './TestData';

/**
 * Skipping async action creator tests 
 * http://redux.js.org/docs/recipes/WritingTests.html#async-action-creators
**/
it('active post action ok', () => {
  const postId = 1;
  const { ACTIVE_POST, setActivePost } = actions;
  const expectedReturn = {
    type: ACTIVE_POST,
    data: postId,
  };

  expect(setActivePost(postId)).toEqual(expectedReturn);
});

it('post list ready action ok', () => {
  const { POST_LIST_SUCCESS, postListReady } = actions;
  const expectedReturn = {
    type: POST_LIST_SUCCESS,
    data: TestPostList,
  };

  expect(postListReady(TestPostList)).toEqual(expectedReturn);
});

it('comment list ready action ok', () => {
  const { COMMENT_LIST_SUCCESS, commentListReady } = actions;
  const expectedReturn = {
    type: COMMENT_LIST_SUCCESS,
    data: TestCommentList,
  };

  expect(commentListReady(TestCommentList)).toEqual(expectedReturn);
});
