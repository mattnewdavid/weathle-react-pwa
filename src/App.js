import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import './App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Title from "react-vanilla-tilt";


function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter' ) {
      const data = await fetchWeather(query);
      console.log(data)
      setWeather(data);
      setQuery('')
    }
  }
  const search_click = async (e) => {
  
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    
  };
  return (
    <div className="container">
      <video src="/images/video-2.mp4" autoPlay loop muted />
      <nav className="nav-container">
        <h2>Weathle</h2>
        <ul>
          <li>Learn More</li>
          <li>About</li>
        </ul>
      </nav>
      <div className="main-container">
        <div className="search-group">
          <input
            type="text"
            className="search"
            value={query}
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            onKeyPress={search}
          />
          <div className="search-icon-container" onClick={search_click}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>
        </div>

        {weather.data && (
          <Title className="city" options={{ glare: true, "max-glare": 1 }}>
            <div>
              <h2 className="city-name">
                <span>{weather.data.name}</span>
                <sup>{weather.data.sys.country}</sup>
              </h2>
              <div className="city-temp">
                {Math.round(weather.data.main.temp)}
                <sup>&deg; C</sup>
              </div>
              <div className="info">
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                  alt="weather-icon"
                />
                <p>{weather.data.weather[0].description}</p>
              </div>
            </div>
          </Title>
        )}
      </div>
    </div>
  );
}

export default App;
