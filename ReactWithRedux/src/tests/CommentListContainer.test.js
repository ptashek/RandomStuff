import React from 'react';
import CommentListContainer from '../components/CommentListContainer.react';
import renderer from 'react-test-renderer';

import { TestCommentList } from './TestData';

it('renders ok', () => {
  const tree = renderer.create(
    <CommentListContainer comments={TestCommentList} />
  ).toJSON();

  expect(tree.children.length).toBe(1);
  expect(tree).toMatchSnapshot();
});
