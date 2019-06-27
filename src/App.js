import React from 'react';
import NavigationBar from './components/NavigationBar';
import Jumbo from './components/Jumbo';
import { Router } from '@reach/router';
import ArticlesPage from './components/ArticlesPage';
import SingleArticle from './components/SingleArticle';
import { Container } from 'react-bootstrap';
import { getUsername, getTopics } from './components/Api';
import User from './components/User';
import ArticlesByTopic from './components/ArticlesByTopic';
import Error from './components/Error';

class App extends React.Component {
  state = {
    username: 'jessjelly',
    loggedIn: true,
    topics: [],
    err: null,
    err1: null
  };

  componentDidMount() {
    getTopics()
      .then(topics => {
        this.setState({ topics });
      })
      .catch(err => {
        this.setState({ err });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { username } = this.state;
    if (username !== prevState.username) {
      this.handleLogIn();
    }
  }

  render() {
    const { username, topics, err, err1 } = this.state;
    const { userInput } = this.props;
    const msg =
      (err && err.response.data.msg) || (err1 && err1.response.data.msg);

    if (err || err1) return <Error msg={msg} />;

    return (
      <div className="App">
        <NavigationBar
          onSubmit={this.handleLogIn}
          userInput={userInput}
          loggedInUser={username}
          logOutUser={this.logOutUser}
          topics={topics}
        />
        <Jumbo />
        <Container>
          <User loggedInUser={username} />
          <Router>
            <ArticlesPage path="/articles" loggedInUser={username} />
            <SingleArticle
              path="/articles/:article_id"
              loggedInUser={username}
            />
            <ArticlesByTopic path={'/topics/:topic'} loggedInUser={username} />
            <Error default />
          </Router>
        </Container>
      </div>
    );
  }

  handleLogIn = userInput => {
    const { loggedIn } = this.state;
    if (loggedIn === false) {
      getUsername(userInput)
        .then(user => {
          this.setState({ username: user.username, loggedIn: true });
        })
        .catch(err1 => {
          this.setState({ err1 });
        });
    }
  };

  logOutUser = event => {
    this.setState(prevState => {
      return { username: (prevState.username = ''), loggedIn: false };
    });
  };
}

export default App;
