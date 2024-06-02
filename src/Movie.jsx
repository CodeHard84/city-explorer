import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function Movie({ title, overview }) {
  return (
    <ListGroup.Item>
      {title}: {overview}
    </ListGroup.Item>
  );
}
