// @flow

import React, { Element, PureComponent } from 'react';
import PropTypes from 'prop-types';

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
  ...PureComponent.propTypes,
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired
  }).isRequired,
}

export default CommentContainer
