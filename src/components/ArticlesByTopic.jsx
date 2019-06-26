import React from 'react';
import ArticleList from './ArticleList';
import FilterArticleBy from './FilterArticleBy';
import { getArticles, sortArticles } from './Api';
import NewArticleForm from './NewArticleForm';

class ArticlesByTopic extends React.Component {
  state = { articles: [], sortBy: '' };

  componentDidMount() {
    const { topic } = this.props;

    getArticles(topic).then(articles => {
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sortBy } = this.state;

    if (topic !== prevProps.topic) {
      getArticles(topic).then(articles => {
        this.setState({ articles });
      });
    }
    if (this.state.sortBy !== prevState.sortBy && this.state.sortBy) {
      sortArticles(sortBy).then(articles => {
        this.setState({ articles });
      });
    }
  }

  render() {
    const { articles } = this.state;
    const { loggedInUser } = this.props;
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
