import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function WeatherDay({ date, description }) {
  return (
    <ListGroup.Item>
      {date}: {description}
    </ListGroup.Item>
  );
}
