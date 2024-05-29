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
        <Card.Title>Weather for {prettyCityName(location.display_name)}</Card.Title>
        <ListGroup variant="flush">
          {props.weather.map((day, index) => (
            <WeatherDay key={index} date={day.date} description={day.description} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

function WeatherDay({ date, description }) {
  return (
    <ListGroup.Item>
      {date}: {description}
    </ListGroup.Item>
  );
}
