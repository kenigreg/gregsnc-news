import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import pexelsImgCropped3 from '../assets/pexelsImgCropped3.jpg';

const Jumbo = props => {
  return (
    <>
      <Jumbotron
        style={{
          backgroundImage: `url(${pexelsImgCropped3})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          imageHeight: '400px'
        }}
        fluid
      >
        <Container>
          <h1 className="text-danger">Welcome to Greg's NCNews</h1>

          <h4 className="text-dark">
            Read articles and leave comments. <br />
            Upvote/Downvote on articles and comments.
          </h4>
        </Container>
      </Jumbotron>
    </>
  );
};

export default Jumbo;
