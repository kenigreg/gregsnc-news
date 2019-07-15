import React from 'react';
import { Link } from '@reach/router';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  InputGroup
} from 'react-bootstrap';
import NClogo from '../assets/NClogo.jpg';

class NavigationBar extends React.Component {
  state = { userInput: '' };

  render() {
    const { onSubmit, loggedInUser, topics } = this.props;
    const { userInput } = this.state;

    return (
      <>
        <Navbar collapseOnSelect bg="light" expand="lg">
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/">
                <li className="nav-link">Home</li>
              </Link>
              <Link to="/articles">
                <li className="nav-link">Articles</li>
              </Link>

              {topics && (
                <NavDropdown title="Topics" id="collasible-nav-dropdown">
                  {topics.map((topic, index) => {
                    return (
                      <NavDropdown.Item
                        href={`/topics/${topic.slug}`}
                        key={'T' + index}
                      >
                        {topic.slug}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              )}
            </Nav>
            {!loggedInUser && (
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
                  defaultValue="jessjelly"
                  required
                />

                <Button
                  variant="outline-success"
                  onClick={e => {
                    e.preventDefault();
                    onSubmit(userInput);
                  }}
                >
                  Log in
                </Button>
              </Form>
            )}
            {loggedInUser && (
              <Button variant="outline-success" onClick={this.handleSignOut}>
                Log out
              </Button>
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
    const { logOutUser } = this.props;
    event.preventDefault();
    logOutUser();
    this.setState({ userInput: '' });
  };
}

export default NavigationBar;
