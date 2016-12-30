import React from 'react';
import CommentContainer from '../components/CommentContainer.react';
import renderer from 'react-test-renderer';

import { TestComment } from './TestData';

it('renders ok', () => {
  const tree = renderer.create(
    <CommentContainer comment={TestComment} />
  ).toJSON();

  expect(tree.children.length).toBe(2);
  expect(tree).toMatchSnapshot();
});
