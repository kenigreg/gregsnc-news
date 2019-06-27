import React from 'react';
import ArticleList from './ArticleList';
import FilterArticleBy from './FilterArticleBy';
import { getArticles, sortArticles } from './Api';
import NewArticleForm from './NewArticleForm';
import Error from './Error';

class ArticlesByTopic extends React.Component {
  state = { articles: [], sortBy: '', err: null, err1: null, err2: null };

  componentDidMount() {
    const { topic } = this.props;

    getArticles(topic)
      .then(articles => {
        this.setState({ articles });
      })
      .catch(err => {
        this.setState({ err });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sortBy } = this.state;

    if (topic !== prevProps.topic) {
      getArticles(topic)
        .then(articles => {
          this.setState({ articles });
        })
        .catch(err1 => {
          this.setState({ err1 });
        });
    }
    if (this.state.sortBy !== prevState.sortBy && this.state.sortBy) {
      sortArticles(sortBy)
        .then(articles => {
          this.setState({ articles });
        })
        .catch(err2 => {
          this.setState({ err2 });
        });
    }
  }

  render() {
    const { articles, err, err1, err2 } = this.state;
    const { loggedInUser, topic } = this.props;

    const msg =
      (err && err.response.data.msg) ||
      (err1 && err1.response.data.msg) ||
      (err2 && err2.response.data.msg);

    if (err || err1 || err2) return <Error msg={msg} />;
    return (
      <div>
        <FilterArticleBy articles={articles} onChange={this.handleChange} />
        <br />
        {articles && (
          <ul>
            <ArticleList articles={this.state.articles} />
          </ul>
        )}
        <br />
        {loggedInUser && (
          <NewArticleForm
            loggedInUser={loggedInUser}
            addArticle={this.addArticle}
            topic={topic}
          />
        )}
        <br />
      </div>
    );
  }

  handleChange = event => {
    this.setState({ sortBy: event.target.value });
  };

  addArticle = article => {
    this.setState(prevState => {
      return { articles: [article, ...prevState.articles] };
    });
  };
}

export default ArticlesByTopic;
