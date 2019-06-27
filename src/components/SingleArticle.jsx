import React, { Component } from 'react';
import { getSingleArticle, patchArticleVotes, deleteArticle } from './Api';
import Moment from 'react-moment';
import CommentsByArticleId from './CommentsByArticleId';
import { Container } from 'react-bootstrap';

class SingleArticle extends Component {
  state = { article: {}, voteChange: 0 };

  componentDidMount() {
    const { article_id } = this.props;
    getSingleArticle(article_id).then(article => {
      this.setState({ article });
    });
  }

  render() {
    const { article, voteChange } = this.state;
    const { loggedInUser } = this.props;
    return (
      <div>
        <Container>
          <br />
          {this.state.article && (
            <article className="card border-dark mb-3">
              <div className="card-header">
                <h4>Title: {article.title}</h4>

                <h6>author: {article.author}</h6>
                <p>
                  created: <Moment fromNow>{article.created_at}</Moment>
                </p>
              </div>
              <div className="card-body">
                <p>{article.body}</p>
              </div>
              <div className="card-footer">
                <h6>Article likes: {article.votes + voteChange}</h6>
                <br />
                {loggedInUser && (
                  <div className="d-flex justify-content-around">
                    <button
                      disabled={voteChange === 1}
                      onClick={() => this.handleVote(1)}
                      type="button"
                      className="btn btn-outline-primary order-1"
                    >
                      upvote
                    </button>
                    <button
                      disabled={voteChange === -1}
                      onClick={() => this.handleVote(-1)}
                      type="button"
                      className="btn btn-outline-warning order-3"
                    >
                      downvote
                    </button>

                    {loggedInUser === article.author && (
                      <button
                        type="submit"
                        onClick={() => this.handleDelete(article.article_id)}
                        className="btn btn-danger order-2"
                      >
                        delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            </article>
          )}
          <br />

          <CommentsByArticleId
            articleId={this.props.article_id}
            loggedInUser={this.props.loggedInUser}
            article={article}
          />
        </Container>
      </div>
    );
  }
  handleVote = direction => {
    const { article_id } = this.props;
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    patchArticleVotes(article_id, direction);
  };

  handleDelete = article_id => {
    deleteArticle(article_id).then(
      this.setState(prevState => {
        return { article: {} };
      })
    );
  };
}

export default SingleArticle;
