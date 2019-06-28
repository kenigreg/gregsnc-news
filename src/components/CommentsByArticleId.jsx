import React from 'react';
import NewCommentForm from './NewCommentForm';
import CommentCard from './CommentCard';
import { getCommentsByArticleId } from './Api';

class CommentsByArticleId extends React.Component {
  state = {
    comments: []
  };

  componentDidMount() {
    const { articleId } = this.props;

    getCommentsByArticleId(articleId).then(comments => {
      this.setState({ comments });
    });
  }

  render() {
    const { comments } = this.state;
    const { loggedInUser, articleId, comment_id, article } = this.props;

    return (
      <div>
        {loggedInUser && (
          <NewCommentForm
            addComment={this.addComment}
            article_id={articleId}
            loggedInUser={loggedInUser}
          />
        )}
        <br />
        {comments.length > 0 && (
          <ul>
            <br />
            {comments.length <= 1 ? (
              <h5>{comments.length} comment</h5>
            ) : (
              <h5>{comments.length} comments</h5>
            )}

            {comments.map((comment, index) => {
              return (
                <div key={'C' + index}>
                  <CommentCard
                    comment={comment}
                    comment_id={comment_id}
                    loggedInUser={loggedInUser}
                    commentToDelete={this.commentToDelete}
                    article={article}
                  />
                </div>
              );
            })}
          </ul>
        )}
        <NewCommentForm
          addComment={this.addComment}
          article_id={articleId}
          loggedInUser={loggedInUser}
        />
        <br />
        <br />
      </div>
    );
  }

  addComment = comment => {
    this.setState(prevState => {
      return { comments: [comment, ...prevState.comments] };
    });
  };

  commentToDelete = deletedComment_id => {
    this.setState(prevState => {
      const notDeletedComment = prevState.comments.filter(
        comment => comment.comment_id !== deletedComment_id
      );
      return { comments: notDeletedComment };
    });
  };
}

export default CommentsByArticleId;
