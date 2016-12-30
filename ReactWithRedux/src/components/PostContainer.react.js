// @flow

import React, { PropTypes, Element, PureComponent } from 'react';
import type { Post } from '../redux/Store';

import '../css/Post.css';

class PostContainer extends PureComponent {
  render(): Element<any> {
    const { post, active, onClick, ...props } = this.props;
    const titleClasses: Array<string> = ["Post-Title"];

    if (active) {
      titleClasses.push("Post-Title-Active");
    }

    return(
      <div {...props}>
        <div className={titleClasses.join(" ")} onClick={onClick}>
          {post.title}
        </div>
        <div className="Post-Body">{post.body}</div>
      </div>
    );
  }
}

PostContainer.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  ...PureComponent
}

export default PostContainer
