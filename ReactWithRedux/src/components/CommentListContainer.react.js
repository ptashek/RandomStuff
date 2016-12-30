// @flow

import React, { PropTypes, Element, PureComponent } from 'react';
import type { Comment } from '../redux/Store';

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
  comments: PropTypes.array,
  ...PureComponent
}

export default CommentListContainer
