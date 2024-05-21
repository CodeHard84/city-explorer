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
    icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
    license: "https://locationiq.com/attribution",
    boundingbox: ['35.290695', '35.6748662', '-97.830948', '-97.124718']
  }); // State to hold the location data
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the user's search query
  const API_KEY = import.meta.env.VITE_API_KEY; // API key for accessing the LocationIQ API
  const ZOOM = 10; // Zoom level for the map
  const boundingBoxPath = location.boundingbox
    ? `path=fill:transparent|weight:2|color:red|${location.boundingbox[0]},${location.boundingbox[2]}|${location.boundingbox[1]},${location.boundingbox[2]}|${location.boundingbox[1]},${location.boundingbox[3]}|${location.boundingbox[0]},${location.boundingbox[3]}|${location.boundingbox[0]},${location.boundingbox[2]}`
    : '';
  const MAP_API = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=${ZOOM}&size=450x450&format=png&maptype=streets&markers=icon:${location.icon}|${location.lat},${location.lon}&${boundingBoxPath}`;

  // Functions
  async function getLocation() {
    // Constructs the API URL using the API key and search query
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    // Makes a GET request to the API using axios
    const response = await axios.get(API);
    // Sets the location state with the first result from the API response
    setLocation(response.data[0]);
    // console.log(response.data[0]);
  }

  function updateQuery(event) {
    // Updates the searchQuery state as the user types in the input field
    setSearchQuery(event.target.value);
  }

  function prettyCityName(city) {
    // Removes the state and country from the city name, leaving only the city name.
    return city.split(',')[0];
  }

  // Is there a better way to write this so I don't have to check every key press?
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      getLocation();
    }
  }

  return (
    <Container className="app-container">
      <h1>City Explorer</h1>
      <Row id="uiButtons" className="mb-3">
        <Col>
          <Form.Control
            id="citySearch"
            name="citySearch"
            type="text"
            placeholder="Enter city name"
            onChange={updateQuery} // Calls updateQuery function on input change
            onKeyDown={handleKeyDown} // Check for enter button press
          />
        </Col>
        <Col>
          <Button
            id="exploreButton"
            name="exploreButton"
            onClick={getLocation} // Calls getLocation function on button click
          >
            Explore!
          </Button>
        </Col>
      </Row>
      <Row id="map-and-details">
        <Col id="cityDetails" md={4}>
          <h2>City: {prettyCityName(location.display_name)}</h2> {/* Displays the city name up to the first comma */}
          <p>Latitude: {location.lat}</p> {/* Displays the latitude of the location */}
          <p>Longitude: {location.lon}</p> {/* Displays the longitude of the location */}
        </Col>
        <Col id="map" md={8}>
          <Image src={MAP_API} alt="Map" fluid />
          <p id='map-license'>Map of {location.display_name} by <a href={location.license} target="_blank">LocationIQ</a>.</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;