import React from 'react';
import Moment from 'react-moment';
import Voter from './Voter';
import { deleteComment } from './Api';

const CommentCard = props => {
  const { comment, loggedInUser } = props;

  const handleDelete = comment_id => {
    deleteComment(comment_id).then(props.commentToDelete(comment_id));
  };

  return (
    <>
      <div className="container">
        <div className="col-md-12">
          <div className="card border-info mb-3">
            <div className="card-header bg-info">
              <p>posted by: {comment.author}</p>
              <p>
                created: <Moment fromNow>{comment.created_at}</Moment>
              </p>
            </div>
            <div className="card-body bg-light">
              <p>{comment.body}</p>
            </div>
            <div className="card-footer bg-light">
              <Voter
                type="comments"
                id={comment.comment_id}
                votes={comment.votes}
                handleDelete={handleDelete}
                loggedInUser={loggedInUser}
                comment={comment}
                author={comment.author}
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentCard;
