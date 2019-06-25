import React, { Component } from 'react';
import { getSingleArticle, patchArticle } from './Api';
//import { Link } from '@reach/router';
import Moment from 'react-moment';
import CommentsByArticleId from './CommentsByArticleId';

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
                <div>
                  <button
                    disabled={voteChange === 1}
                    onClick={() => this.handleVote(1)}
                    type="button"
                    className="btn btn-outline-success float-left"
                  >
                    Upvote
                  </button>
                  <button
                    disabled={voteChange === -1}
                    onClick={() => this.handleVote(-1)}
                    type="button"
                    className="btn btn-outline-warning float-right"
                  >
                    Downvote
                  </button>
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
      </div>
    );
  }
  handleVote = direction => {
    const { article_id } = this.props;
    this.setState(prevState => {
      return { voteChange: prevState.voteChange + direction };
    });
    patchArticle(article_id, direction);
  };
}

export default SingleArticle;
