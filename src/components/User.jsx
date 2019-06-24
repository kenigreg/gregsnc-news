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
      <div className="card bg-info" style={{ width: '200px' }}>
        <div className="card-body">
          <h4 className="card-title">{user.name}</h4>
          <p className="card-text">You are logged-in as: {user.username}</p>
        </div>
      </div>
    );
  }
}

export default User;
