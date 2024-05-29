import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

function Movie({ title, overview }) {
  return (
    <ListGroup.Item>
      {title}: {overview}
    </ListGroup.Item>
  );
}

export default function Movies({ movies, name }) {
  if (!movies || !Array.isArray(movies)) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Movies filmed in {name}</Card.Title>
        <ListGroup variant="flush">
          {movies.map((movie, index) => (
            <Movie key={index} title={movie.title} overview={movie.overview} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}