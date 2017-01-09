import React from 'react';
import AppHeader from '../components/AppHeader.react';
import renderer from 'react-test-renderer';

it('renders ok with default props', () => {
  const tree = renderer.create(<AppHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ok with animate=false and no children', () => {
  const tree = renderer.create(
    <AppHeader animate={false} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ok with animate=true and no children', () => {
  const tree = renderer.create(
    <AppHeader animate={true} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ok with animate=true and one child', () => {
  const tree = renderer.create(
    <AppHeader animate={true}>
      <div>test</div>
    </AppHeader>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ok with animate=false and one child', () => {
  const tree = renderer.create(
    <AppHeader animate={false}>
      <div>test</div>
    </AppHeader>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ok with animate=true and many children', () => {
  const tree = renderer.create(
    <AppHeader animate={true}>
      <div>one</div>
      <div>two</div>
    </AppHeader>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders ok with animate=false and many children', () => {
  const tree = renderer.create(
    <AppHeader animate={false}>
      <div>one</div>
      <div>two</div>
    </AppHeader>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
