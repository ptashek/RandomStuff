// @flow

import React, { Element, PureComponent } from 'react';
import PropTypes from 'prop-types';
import type { Post } from '../redux/store';

import PostContainer from './PostContainer.react';

import '../css/Post.css';

class PostListContainer extends PureComponent {
  render(): Element<any> {
    const { posts, activePost, onPostClick, ...props } = this.props;

    return(
      <div {...props}>
        {posts.map(
          (post: Post) => <PostContainer
            className="Post-Container"
            key={"post:" + post.id}
            post={post}
            active={post.id === activePost}
            onClick={(e: SyntheticEvent) => onPostClick(e, post.id)}
          />
        )}
      </div>
    );
  }
}

PostListContainer.propTypes = {
  ...PureComponent.propTypes,
  posts: PropTypes.array.isRequired,
  activePost: PropTypes.number.isRequired,
  onPostClick: PropTypes.func.isRequired,
}

export default PostListContainer
