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

class App extends React.Component {
  state = {
    username: 'jessjelly',
    loggedIn: false,
    topics: []
  };

  componentDidMount() {
    getTopics().then(topics => {
      this.setState({ topics });
    });
  }

  render() {
    const { username, topics } = this.state;
    const { userInput, loggedInUser } = this.props;

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
            {loggedInUser && <p>You are logged-in</p>}
            <ArticlesPage path="/articles" loggedInUser={username} />
            {loggedInUser && <p>You are logged-in</p>}
            <SingleArticle
              path="/articles/:article_id"
              loggedInUser={username}
            />
            <ArticlesByTopic
              path={'/topics/:topic'}
              loggedInUser={username}
              topics={topics}
            />
          </Router>
        </Container>
      </div>
    );
  }

  handleLogIn = userInput => {
    getUsername(userInput).then(user => {
      this.setState({ username: user.username, loggedIn: true });
    });
  };

  logOutUser = event => {
    this.setState(prevState => {
      return { username: (prevState.username = ''), loggedIn: false };
    });
  };
}

export default App;

//  <User loggedInUser={username} />
