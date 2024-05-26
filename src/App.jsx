import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';
import './App.css';
import Weather from './Weather';
import Movies from './Movies';


function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState();
  const [movies, setMovies] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const USED_URL = import.meta.env.VITE_USED_URL;

  const ZOOM = 10;

  const getBoundingBoxPath = (boundingbox) => {
    return boundingbox
      ? `path=fill:transparent|weight:2|color:red|${boundingbox[0]},${boundingbox[2]}|${boundingbox[1]},${boundingbox[2]}|${boundingbox[1]},${boundingbox[3]}|${boundingbox[0]},${boundingbox[3]}|${boundingbox[0]},${boundingbox[2]}`
      : '';
  };

  const getMapApiUrl = (location) => {
    const boundingBoxPath = getBoundingBoxPath(location.boundingbox);
    return `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=${ZOOM}&size=450x450&format=png&maptype=streets&markers=icon:${location.icon}|${location.lat},${location.lon}&${boundingBoxPath}`;
  };

  const handleError = (error, message) => {
    console.error('API Error: ', error);
    setErrorMessage(message);
    setHasSearched(false);
  };

  async function getLocation(event) {
    event.preventDefault();
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
      const response = await axios.get(API);
      const locationData = response.data[0];
      setLocation(locationData);
      setErrorMessage('');
      setHasSearched(true);
      getWeather(locationData);
      getMovies(locationData);
    } catch (error) {
      handleError(error, 'Check your form submission and try again.');
    }
  }

  function getWeather(location) {
    const API = `${USED_URL}/weather?searchQuery=${prettyCityName(location.display_name)}&lat=${location.lat}&lon=${location.lon}`;
    axios.get(API)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        handleError(error, 'Check your form submission and try again.');
      });
  }

  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

  function getMovies(location) {
    const API = `${USED_URL}/movies?searchQuery=${prettyCityName(location.display_name)}`;
    axios.get(API)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        handleError(error, 'Check your form submission and try again.');
      });
  }

  return (
    <Container className="app-container">
      <h1>City Explorer</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={getLocation}>
        <Row id="uiButtons" className="mb-3">
          <Col>
            <Form.Control
              id="citySearch"
              name="citySearch"
              type="text"
              placeholder="Enter city name"
              onChange={updateQuery}
            />
          </Col>
          <Col>
            <Button id="exploreButton" name="exploreButton" type="submit">
              Explore!
            </Button>
          </Col>
        </Row>
      </Form>
      {hasSearched && (
        <>
          <Row id="map-and-details">
            <Col id="cityDetails" md={4}>
              <h2>City: {prettyCityName(location.display_name)}</h2>
              <p>Latitude: {location.lat}</p>
              <p>Longitude: {location.lon}</p>
            </Col>
            <Col id="map" md={8}>
              <Image src={getMapApiUrl(location)} alt="Map" fluid />
              <p id='map-license'>Map of {location.display_name} by <a href={location.license || 'https://locationiq.com/attribution'} target="_blank">LocationIQ</a>.</p>
            </Col>
          </Row>
          <Row id="weather">
            <Col>
              <Weather location={location} weather={weather} />
              <Movies name={prettyCityName(location.display_name)} movies={movies} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

function prettyCityName(city) {
  return city ? city.split(',')[0] : '';
}

export { App as default, prettyCityName };
