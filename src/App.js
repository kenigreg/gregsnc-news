import React from 'react';
import NavigationBar from './components/NavigationBar';
import Jumbo from './components/Jumbo';
import { Router } from '@reach/router';
import ArticlesPage from './components/ArticlesPage';
import SingleArticle from './components/SingleArticle';
import { Container } from 'react-bootstrap';
import { getUsername } from './components/Api';
// import User from './components/User';

class App extends React.Component {
  state = { username: 'jessjelly', loggedIn: false };

  render() {
    const { username } = this.state;
    const { userInput, loggedInUser } = this.props;

    return (
      <div className="App">
        <NavigationBar
          onSubmit={this.handleLogIn}
          userInput={userInput}
          loggedInUser={username}
          logOutUser={this.logOutUser}
        />
        <Jumbo />

        <Container>
          <Router>
            {loggedInUser && <p>You are logged-in</p>}
            <ArticlesPage path="/articles" loggedInUser={username} />
            {loggedInUser && <p>You are logged-in</p>}
            <SingleArticle
              path="/articles/:article_id"
              loggedInUser={username}
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
