import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  // Constants
  const [location, setLocation] = useState({ display_name: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Functions
  async function getLocation() {
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;
    const response = await axios.get(API);
    setLocation(response.data[0]);
  }

  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

  function prettyCityName(city) {
    // Removes the state and country from the city name, leaving only the city name.
    return city.split(',')[0];
  }

  return (
    <div className="app-container">
      <h1>City Explorer</h1>
      <div id="uiButtons">
        <input id="citySearch" name="citySearch" type="text" placeholder="Enter city name" onChange={updateQuery} />
        <button id="exploreButton" name="exploreButton" onClick={getLocation}>Explore!</button>
      </div>
      <div id="cityDetails">
        <h2>City: {prettyCityName((location.display_name))}</h2>
        <h3>Latitude: {location.lat}</h3>
        <h3>Longitude: {location.lon}</h3>
      </div>
    </div>
  );
}

export default App;