import React, { Component } from 'react';
import { getUsers } from './Api';

class User extends Component {
  state = { user: '' };

  componentDidMount() {
    const { loggedInUser } = this.props;

    getUsers(loggedInUser).then(user => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="card bg-light border-dark mb-4">
        <div className="card-body">
          <p className="card-text">You are logged-in as: {user.username}</p>
          <h5 className="card-title">User: {user.name}</h5>
        </div>
      </div>
    );
  }
}

export default User;
