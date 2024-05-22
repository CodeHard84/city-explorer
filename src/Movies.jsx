import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

export default function Movies(props) {
  if (!props.movies || !Array.isArray(props.movies)) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Movies filmed in {props.name}</Card.Title>
        <ListGroup variant="flush">
          {props.movies.map((movie, index) => (
            <ListGroup.Item key={index}>
              {movie.title} {movie.overview}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}