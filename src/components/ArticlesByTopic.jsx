import React from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import FilterArticleBy from './FilterArticleBy';
import { sortArticles } from './Api';

class ArticlesByTopic extends React.Component {
  state = { articles: [], sortBy: '' };

  componentDidMount() {
    const { topic } = this.props;

    const url = 'https://gregs-ncnews.herokuapp.com/api/articles';
    axios
      .get(url, {
        params: { topic: topic }
      })
      .then(({ data: { articles } }) => {
        this.setState({ articles });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { topic } = this.props;
    const { sortBy } = this.state;

    if (topic !== prevProps.topic) {
      const url = 'https://gregs-ncnews.herokuapp.com/api/articles';
      axios
        .get(url, {
          params: { topic }
        })
        .then(({ data: { articles } }) => {
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

    return (
      <div>
        <FilterArticleBy articles={articles} onChange={this.handleChange} />
        <br />
        {this.state.articles && (
          <ul>
            <ArticleList articles={this.state.articles} />
          </ul>
        )}
      </div>
    );
  }

  handleChange = event => {
    this.setState({ sortBy: event.target.value });
  };
}

export default ArticlesByTopic;
