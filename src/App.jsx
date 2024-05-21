import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import './App.css';

function App() {
  // Constants
  const [location, setLocation] = useState({
    display_name: 'Oklahoma City',
    lat: '35.4729886',
    lon: '-97.5170536',
    icon: 'https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png',
    license: 'https://locationiq.com/attribution',
    boundingbox: ['35.290695', '35.6748662', '-97.830948', '-97.124718']
  });
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = import.meta.env.VITE_API_KEY;
  const ZOOM = 10;
  const boundingBoxPath = location.boundingbox
    ? `path=fill:transparent|weight:2|color:red|${location.boundingbox[0]},${location.boundingbox[2]}|${location.boundingbox[1]},${location.boundingbox[2]}|${location.boundingbox[1]},${location.boundingbox[3]}|${location.boundingbox[0]},${location.boundingbox[3]}|${location.boundingbox[0]},${location.boundingbox[2]}`
    : '';
  const MAP_API = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=${ZOOM}&size=450x450&format=png&maptype=streets&markers=icon:${location.icon}|${location.lat},${location.lon}&${boundingBoxPath}`;

  // Functions
  async function getLocation(event) {
    event.preventDefault(); // Prevent form submission
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
      const response = await axios.get(API);
      setLocation(response.data[0]);
      console.log(location);
      console.log(location.license);
    } catch (error) {
      console.error('API Error: ', error);
    }
  }

  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

  function prettyCityName(city) {
    return city.split(',')[0];
  }

  return (
    <Container className="app-container">
      <h1>City Explorer</h1>
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
      <Row id="map-and-details">
        <Col id="cityDetails" md={4}>
          <h2>City: {prettyCityName(location.display_name)}</h2>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lon}</p>
        </Col>
        <Col id="map" md={8}>
          <Image src={MAP_API} alt="Map" fluid />
          {/* Ask Cameron why location.license is not updating when location is updated. */}
          <p id='map-license'>Map of {location.display_name} by <a href={location.license || 'https://locationiq.com/attribution'} target="_blank">LocationIQ</a>.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;