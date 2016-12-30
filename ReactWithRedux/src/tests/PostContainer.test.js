import React from 'react';
import PostContainer from '../components/PostContainer.react';
import renderer from 'react-test-renderer';

import { TestPost, emptyFunction } from './TestData';

it('renders ok if inactive', () => {
  const component = renderer.create(
    <PostContainer
      onClick={emptyFunction}
      active={false}
      post={TestPost}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(2);

  tree.children[0].props.onClick();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ok if active', () => {
  const component = renderer.create(
    <PostContainer
      onClick={emptyFunction}
      active={true} 
      post={TestPost}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children.length).toBe(2);

  tree.children[0].props.onClick();

  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
