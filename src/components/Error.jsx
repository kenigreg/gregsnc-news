import React from 'react';
import { Container } from 'react-bootstrap';

const Error = ({ msg, article_id }) => {
  return (
    <Container>
      <h3 className="text-center">{msg}</h3>
    </Container>
  );
};

export default Error;
