// @flow

/* Module imports */
import React, { Component, Element } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  * as actionCreators from '../redux/actions';
import type { Dispatch } from '../redux/actions';
import type { Post } from '../redux/store';

import AppHeader from './AppHeader.react';
import PostListContainer from './PostListContainer.react';
import CommentListContainer from './CommentListContainer.react';

import '../css/App.css';
import '../css/Post.css';

class App extends Component {

  props: {
    actions: Object,
    activePost: number,
    busy: Boolean,
    comments: Object,
    posts: Array<Post>,
  };

  onPostClick = (e: SyntheticEvent, id: number): void => {
    e.preventDefault();
    const { activePost, actions } = this.props;
    if (activePost !== id) {
      actions.setActivePost(id);
      actions.getCommentList();
    }
  };

  componentDidMount(): void {
    const { getPostList } = this.props.actions;
    getPostList();
  }

  render(): Element<any> {
    const { posts, comments, activePost } = this.props;
    return (
      <div className="App">
        <AppHeader className="App-Header" animate={true}>
          <div style={{fontSize: '24pt', order: 1}}>
            Hello! I'm a test page!
          </div>
          <div style={{fontSize: '12pt', order: 2, color: "#C3C3C3"}}>
            React + Redux test page boostraped using create-react-app
          </div>
        </AppHeader>
        <div className="App-Content-Container">
          <PostListContainer
            className="App-Content-Main Post-List"
            posts={posts}
            activePost={activePost}
            onPostClick={this.onPostClick}
          />
          <CommentListContainer
            className="App-Content-Secondary Comment-List"
            comments={comments[activePost]}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  activePost: PropTypes.number.isRequired,
  busy: PropTypes.bool.isRequired,
  // TODO: define shapes for comments and posts
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch: Dispatch): Object {
  const actions = bindActionCreators({ ...actionCreators }, dispatch);
  return { actions };
}

export default connect(state => state, mapDispatchToProps)(App)
