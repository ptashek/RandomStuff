// @flow

/* Module imports */
import React, { Component, Element } from 'react';
import AppHeader from './AppHeader.react';
import PostListContainer from './PostListContainer.react';
import CommentListContainer from './CommentListContainer.react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  * as actionCreators from '../redux/Actions';

import type { Dispatch } from '../redux/Actions';
import type { Post, State } from '../redux/Store';

import '../css/App.css';
import '../css/Post.css';

class App extends Component {

  props: {
    state: State,
    store: Object,
    actions: Object,
  };

  onPostClick = (e: SyntheticEvent, id: number): void => {
    e.preventDefault();
    if (this.props.state.activePost !== id) {
      const { setActivePost, getCommentList } = this.props.actions;
      setActivePost(id);
      getCommentList();
    }
  };

  componentDidMount(): void {
    const { getPostList } = this.props.actions;
    getPostList();
  }

  render(): Element<any> {
    const { state } = this.props;
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
            posts={state.posts}
            activePost={state.activePost}
            onPostClick={this.onPostClick}
          />
          <CommentListContainer
            className="App-Content-Secondary Comment-List"
            comments={state.comments[state.activePost]}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State): Object {
  return { state: state };
}

function mapDispatchToProps(dispatch: Dispatch): Object {
  const actions = bindActionCreators({ ...actionCreators }, dispatch);
  return { actions: actions };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
