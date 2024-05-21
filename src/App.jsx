import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  // Constants
  const [location, setLocation] = useState({display_name: 'OKC'});
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Functions
  async function getLocation() {
    const API = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${searchQuery}&format=json`;   
    const response = await axios.get(API);
    console.log(response);
  }

  function updateQuery(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="app-container">
      <h1>City Explorer</h1>
      <input id="citySearch" name="citySearch" type="text" placeholder="Enter city name" onChange={updateQuery}/>
      <button id="exploreButton" name="exploreButton" onClick={getLocation}>Explore!</button>
      <h2>City: {location.display_name}</h2>
    </div>
  );
}

export default App;