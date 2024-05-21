import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  // Constants
  const [location, setLocation] =
    useState({
      display_name: 'Oklahoma City',
      lat: '35.4729886',
      lon: '-97.5170536',
      icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
      license: "https://locationiq.com/attribution"
    }); // State to hold the location data
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the user's search query
  const API_KEY = import.meta.env.VITE_API_KEY; // API key for accessing the LocationIQ API
  const ZOOM = 10; // Zoom level for the map
  const MAP_API = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${location.lat},${location.lon}&zoom=${ZOOM}&size=450x450&format=png&maptype=streets&markers=icon:${location.icon}`;

  // Functions
  async function getLocation() {
    // Constructs the API URL using the API key and search query
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    // Makes a GET request to the API using axios
    const response = await axios.get(API);
    // Sets the location state with the first result from the API response
    setLocation(response.data[0]);
    console.log(response.data[0]);
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
    <div className="app-container">
      <h1>City Explorer</h1>
      <div id="uiButtons">
        <input
          id="citySearch"
          name="citySearch"
          type="text"
          placeholder="Enter city name"
          onChange={updateQuery} // Calls updateQuery function on input change
          onKeyDown={handleKeyDown} // Check for enter button press
        />
        <button
          id="exploreButton"
          name="exploreButton"
          onClick={getLocation} // Calls getLocation function on button click
        >
          Explore!
        </button>
      </div>
      <div id="map-and-details">
        <div id="cityDetails">
          <h2>City: {prettyCityName(location.display_name)}</h2> {/* Displays the city name up to the first comma */}
          <h3>Latitude: {location.lat}</h3> {/* Displays the latitude of the location */}
          <h3>Longitude: {location.lon}</h3> {/* Displays the longitude of the location */}
        </div>
        <div id="map">
          <img src={MAP_API} alt="Map" />
          <p id='map-license'>Map of {location.display_name} by <a href={location.license} target="_blank">LocationIQ</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
