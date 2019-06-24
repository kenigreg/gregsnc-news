import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import newsImg4Cropped from '../assets/newsImg4Cropped.jpg';

class Jumbo extends React.Component {
  render() {
    return (
      <>
        <Jumbotron
          style={{
            backgroundImage: `url(${newsImg4Cropped})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            imageHeight: '400px'
          }}
          fluid
        >
          <Container>
            <h1 className="text-danger">Welcome to Greg's NCNews</h1>
            <h5 className="text-dark">
              Read articles and leave comments. <br />
              Upvote/Downvote on articles and comments.
            </h5>
          </Container>
        </Jumbotron>
      </>
    );
  }
}

export default Jumbo;
