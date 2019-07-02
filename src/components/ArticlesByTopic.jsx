import React from 'react';
import ArticleList from './ArticleList';
import FilterArticleBy from './FilterArticleBy';
import { getArticles, sortArticles } from './Api';
import NewArticleForm from './NewArticleForm';
import Error from './Error';

class ArticlesByTopic extends React.Component {
  state = {
    articles: [],
    sortBy: '',
    errTopic: null,
    errTopicUpdate: null,
    errSortby: null
  };

  componentDidMount() {
    const { topic } = this.props;

    getArticles(topic)
      .then(articles => {
        this.setState({ articles });
      })
      .catch(errTopic => {
        this.setState({ errTopic });
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
        .catch(errTopicUpdate => {
          this.setState({ errTopicUpdate });
        });
    }
    if (this.state.sortBy !== prevState.sortBy && this.state.sortBy) {
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
    const { articles, errTopic, errTopicUpdate, errSortby } = this.state;
    const { loggedInUser, topic, topics } = this.props;

    const msg =
      (errTopic && errTopic.response.data.msg) ||
      (errTopicUpdate && errTopicUpdate.response.data.msg) ||
      (errSortby && errSortby.response.data.msg);

    if (errTopic || errTopicUpdate || errSortby)
      return <Error msg={msg} topics={topics} />;
    return (
      <div>
        <FilterArticleBy articles={articles} onChange={this.handleChange} />
        <br />
        {loggedInUser && (
          <NewArticleForm
            loggedInUser={loggedInUser}
            addArticle={this.addArticle}
            topic={topic}
          />
        )}
        <br />
        {articles && (
          <ul>
            <ArticleList articles={this.state.articles} />
          </ul>
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
