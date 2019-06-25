import React from 'react';
import { Link } from '@reach/router';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NClogo from '../assets/NClogo.jpg';

class Navigation extends React.Component {
  state = { userInput: '' };

  render() {
    const { onSubmit, loggedInUser } = this.props;
    const { userInput } = this.state;

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Link to="/">
            <Navbar.Brand>
              <img
                alt="NCLogo"
                src={NClogo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              {' NC News'}
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">
                <li className="nav-link">Home</li>
              </Link>
              <Link to="/articles">
                <li className="nav-link">Articles</li>
              </Link>
              <NavDropdown title="Topics" id="basic-nav-dropdown">
                <Link to="/topics/coding">
                  <li className="nav-link">coding</li>
                </Link>
                <Link to="/topics/football">
                  <li className="nav-link">football</li>
                </Link>
                <Link to="/topics/cooking">
                  <li className="nav-link">cooking</li>
                </Link>
              </NavDropdown>
            </Nav>
            {!loggedInUser && (
              <form className="form-inline">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    type="text"
                    className="form-control mr-sm-2"
                    placeholder="Username"
                    onChange={this.handleUserName}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={e => {
                    e.preventDefault();
                    onSubmit(userInput);
                  }}
                >
                  Log in
                </button>
              </form>
            )}
            {loggedInUser && (
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={this.handleSignOut}
              >
                Log out
              </button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
  handleUserName = event => {
    this.setState({ userInput: event.target.value });
  };

  handleSignOut = event => {
    event.preventDefault();
    this.props.logOutUser();
    this.setState({ userInput: '' });
  };
}

export default Navigation;
