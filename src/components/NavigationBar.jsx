import React from 'react';
import { Link } from '@reach/router';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import NClogo from '../assets/NClogo.jpg';

class NavigationBar extends React.Component {
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
            <Form inline>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
              </InputGroup>
              <FormControl
                type="text"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="mr-sm-2"
                onChange={this.handleUserName}
              />
              {!loggedInUser && (
                <Button
                  variant="outline-success"
                  onClick={e => {
                    e.preventDefault();
                    onSubmit(userInput);
                  }}
                >
                  Log in
                </Button>
              )}
              {loggedInUser && (
                <Button variant="outline-success" onClick={this.handleSignOut}>
                  Log out
                </Button>
              )}
            </Form>
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

export default NavigationBar;
