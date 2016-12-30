import React from 'react';
import PostListContainer from '../components/PostListContainer.react';
import renderer from 'react-test-renderer';

import { TestPostList, emptyFunction } from './TestData';

it('renders ok', () => {
  const component = renderer.create(
    <PostListContainer
      activePost={TestPostList[0].id}
      onPostClick={emptyFunction}
      posts={TestPostList}
    />
  );
  let tree = component.toJSON();

  expect(tree.children.length).toBe(1);
  expect(tree.children[0].children.length).toBe(2);

  tree.children[0].children[0].props.onClick();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
