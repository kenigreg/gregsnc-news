import React from 'react';
import { patchComment, deleteComment } from './Api';
import Moment from 'react-moment';

class CommentCard extends React.Component {
  state = { commentVoteChange: 0 };

  render() {
    const { commentVoteChange } = this.state;
    const { comment, loggedInUser } = this.props;

    return (
      <>
        <div className="card border-info mb-3">
          <div className="card-header bg-info">
            <p>posted by: {comment.author}</p>
            <p>
              created: <Moment fromNow>{comment.created_at}</Moment>
            </p>
          </div>
          <div className="card-body bg-light">
            <h5>{comment.body}</h5>
          </div>
          <div className="card-footer bg-light">
            <p>comment likes: {comment.votes + commentVoteChange}</p>
            {loggedInUser && (
              <>
                <button
                  disabled={commentVoteChange === 1}
                  onClick={() => this.handleVote(1)}
                  className="btn btn-outline-primary float-left"
                >
                  Like comment
                </button>
                <button
                  disabled={commentVoteChange === -1}
                  onClick={() => this.handleVote(-1)}
                  className="btn btn-outline-warning float-right"
                >
                  Unlike comment
                </button>
                <br />
                <br />
                {loggedInUser === comment.author && (
                  <button
                    type="submit"
                    onClick={() => this.handleDelete(comment.comment_id)}
                    className="btn btn-danger float-left"
                  >
                    delete comment
                  </button>
                )}
              </>
            )}
          </div>
          <br />
        </div>
      </>
    );
  }
  handleVote = direction => {
    this.setState(prevState => {
      return { commentVoteChange: prevState.commentVoteChange + direction };
    });
    patchComment(this.props.comment.comment_id, direction);
  };

  handleDelete = comment_id => {
    deleteComment(comment_id).then(this.props.commentToDelete(comment_id));
  };
}

export default CommentCard;
