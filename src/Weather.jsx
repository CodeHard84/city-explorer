import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { prettyCityName } from './App';
import WeatherDay from './WeatherDay';

export default function Weather({ weather, location }) {
  if (!weather || !Array.isArray(weather)) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Weather for {prettyCityName(location.display_name)}</Card.Title>
        <ListGroup variant="flush">
          {weather.map((day, index) => (
            <WeatherDay key={index} date={day.date} description={day.description} />
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
