import React, { Component } from 'react';
import { getSingleArticle, patchArticleVotes, deleteArticle } from './Api';
import Moment from 'react-moment';
import CommentsByArticleId from './CommentsByArticleId';
import { Container } from 'react-bootstrap';
import { navigate } from '@reach/router';
import Error from './Error';
import Voter from './Voter';

class SingleArticle extends Component {
  state = { article: {}, errSingleArticle: null };

  componentDidMount() {
    const { article_id } = this.props;
    getSingleArticle(article_id)
      .then(article => {
        this.setState({ article });
      })
      .catch(errSingleArticle => {
        this.setState({ errSingleArticle });
      });
  }

  render() {
    const { article, errSingleArticle } = this.state;
    const { loggedInUser, article_id } = this.props;

    const msg = errSingleArticle && errSingleArticle.response.data.msg;

    if (errSingleArticle) return <Error msg={msg} />;
    return (
      <div>
        <Container>
          <br />
          {article && (
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
                <Voter
                  type="article"
                  id={article_id}
                  votes={article.votes}
                  handleDelete={this.handleDelete}
                  article={article}
                  loggedInUser={loggedInUser}
                  author={article.author}
                />
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
    deleteArticle(article_id).then(() => navigate('/articles'));
  };
}

export default SingleArticle;
