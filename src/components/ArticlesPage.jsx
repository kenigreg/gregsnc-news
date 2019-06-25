import React, { Component } from 'react';
import { getArticles, sortArticles } from './Api';
import ArticleList from './ArticleList';
import FilterArticleBy from './FilterArticleBy';
import NewArticleForm from './NewArticleForm';

class ArticlesPage extends Component {
  state = { articles: [], sortBy: '' };

  componentDidMount() {
    getArticles().then(articles => {
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
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
        <br />
        <h3 className="text-center">Headlines</h3>
        <br />
        <FilterArticleBy articles={articles} onChange={this.handleChange} />
        <br />
        {articles && (
          <ul>
            <ArticleList articles={articles} />
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

export default ArticlesPage;
