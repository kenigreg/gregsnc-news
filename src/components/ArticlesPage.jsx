import React, { Component } from 'react';
import { getArticles, sortArticles } from './Api';
import ArticleList from './ArticleList';
import FilterArticleBy from './FilterArticleBy';
import NewArticleForm from './NewArticleForm';

import Error from './Error';

class ArticlesPage extends Component {
  state = { articles: [], sortBy: '', errAticles: null, errSortby: null };

  componentDidMount() {
    getArticles()
      .then(articles => {
        this.setState({ articles });
      })
      .catch(errAticles => {
        this.setState({ errAticles });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    if (sortBy !== prevState.sortBy && sortBy) {
      sortArticles(sortBy)
        .then(articles => {
          this.setState({ articles });
        })
        .catch(errSortby => {
          this.setState({ errSortby });
        });
    }
  }

  render() {
    const { articles, err, err1 } = this.state;
    const { loggedInUser } = this.props;

    const msg =
      (err && err.response.data.msg) || (err1 && err1.response.data.msg);

    if (err || err1) return <Error msg={msg} />;
    return (
      <div className="m-auto">
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
