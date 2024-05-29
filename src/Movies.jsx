import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';

export default function Movies({ movies, name }) {
  if (!movies || !Array.isArray(movies)) {
    return null;
  }

  const Movie = ({ title, overview }) => (
    <ListGroup.Item>
      <strong>{title}</strong>: {overview}
    </ListGroup.Item>
  );

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
