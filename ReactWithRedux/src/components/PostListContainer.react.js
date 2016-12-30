// @flow

import React, { PropTypes, Element, PureComponent } from 'react';
import type { Post } from '../redux/Store';

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
  posts: PropTypes.array.isRequired,
  activePost: PropTypes.number.isRequired,
  onPostClick: PropTypes.func.isRequired,
  ...PureComponent
}

export default PostListContainer
