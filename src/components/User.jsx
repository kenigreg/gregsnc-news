import React, { Component } from 'react';
import { getUsers } from './Api';
import Error from './Error';

class User extends Component {
  state = { user: '', errUser: null };

  componentDidMount() {
    const { loggedInUser } = this.props;

    getUsers(loggedInUser).then(user => {
      this.setState({ user });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { loggedInUser } = this.props;
    if (loggedInUser !== prevProps.loggedInUser) {
      getUsers(loggedInUser).then(user => {
        this.setState({ user });
      });
    }
  }

  render() {
    const { user, errUser } = this.state;
    const msg = errUser && errUser.response.data.msg;

    if (errUser) return <Error msg={msg} />;
    return (
      <div className="card bg-light border-dark mb-4">
        {user && (
          <div className="card-body">
            <p className="card-text">You are logged-in as: {user.username}</p>
            <h5 className="card-title">User: {user.name}</h5>
          </div>
        )}
      </div>
    );
  }
}

export default User;
