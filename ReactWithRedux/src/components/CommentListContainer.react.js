// @flow

import React, { Element, PureComponent } from 'react';
import PropTypes from 'prop-types';
import type { Comment } from '../redux/store';

import CommentContainer from './CommentContainer.react';

import '../css/Comment.css';

class CommentListContainer extends PureComponent {
  render(): Element<any> {
    const { comments, ...props } = this.props;
    if (!comments) {
      return <div {...props}>No comments</div>;
    }

    return(
      <div {...props}>
        {comments.map(
          (comment: Comment) => <CommentContainer
            className="Comment-Container"
            key={"comment:" + comment.postId + ":" + comment.id}
            comment={comment}
          />
        )}
      </div>
    );
  }
}

CommentListContainer.propTypes = {
  ...PureComponent.propTypes,
  comments: PropTypes.array,
}

export default CommentListContainer
