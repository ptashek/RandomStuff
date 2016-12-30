// @flow

import React, { PropTypes, Element, PureComponent } from 'react';
import type { Comment } from '../redux/Store';

import '../css/Comment.css';

class CommentContainer extends PureComponent {
  render(): Element<any> {
    const { comment, ...props } = this.props;
    return(
      <div {...props}>
        <div className="Comment-Body">{comment.body}</div>
        <div className="Comment-Footer">
          by {comment.name} ({comment.email})
        </div>
      </div>
    );
  }
}

CommentContainer.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired,
  ...PureComponent
}

export default CommentContainer
