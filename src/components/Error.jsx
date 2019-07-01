import React from 'react';
import { Container } from 'react-bootstrap';

const Error = ({ msg, article_id, topics }) => {
  return (
    <Container>
      {topics ? (
        <h3 className="text-center">Topic Not Found</h3>
      ) : <h3 className="text-center">{msg}</h3> || article_id ? (
        <h3 className="text-center">Article Not Found</h3>
      ) : (
        <h3 className="text-center">{msg}</h3>
      )}
    </Container>
  );
};

export default Error;
