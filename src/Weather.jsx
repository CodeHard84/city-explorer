import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { prettyCityName } from './App';

export default function Weather(props) {
  if (!props.weather || !Array.isArray(props.weather)) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Weather for {prettyCityName(props.location.display_name)}</Card.Title>
        <ListGroup variant="flush">
          {props.weather.map((day, index) => (
            <ListGroup.Item key={index}>
              {day.date} {day.description}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
