import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import Movie from './Movie';

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

Movies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired
    })
  ).isRequired,
  name: PropTypes.string.isRequired
};
