import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import GetLocationButton from "./components/GetLocationButton";
import GetWeatherButton from "./components/GetWeatherButton";
import WeatherData from "./components/WeatherData";
import ForecastData from "./components/ForecastData";
import OpenWeatherMapService from "./services/OpenWeatherMapService";
import "./styles/App.css";

function App() {
  const [city, setCity] = useState("");
  const [, setWeather] = useState(null);
  const [, setForecast] = useState(null);
  const [weatherComponent, setWeatherComponent] = useState(null);
  const [isInputStarted, setIsInputStarted] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
    setError(null);
  };

  const handleWeatherData = (data, isForecast) => {
    if (data && data.message) {
      setError(data.message);
    } else {
      isForecast ? setForecast(data.data) : setWeather(data.data);
      setWeatherComponent(isForecast ? <ForecastData forecast={data.data} /> : <WeatherData weather={data.data} />);
      setError(null);
    }
  };

  const handleGetWeather = (data) => {
    handleWeatherData(data, false);
  };

  const handleGetForecast = (data) => {
    handleWeatherData(data, true);
  };

  const handleGetLocation = (location) => {
    const service = new OpenWeatherMapService();
    service
      .getWeatherByCoordinates(location.latitude, location.longitude)
      .then((data) => {
        setCity(data.data.name);
        setWeather(data.data);
        setWeatherComponent(<WeatherData weather={data.data} />);
      })
      .catch((error) => {
        setError(error.message || "Unexpected error occurred");
      });

    service
      .getForecastByCoordinates(location.latitude, location.longitude)
      .then((data) => {
        setForecast(data.data);
        setWeatherComponent(<ForecastData forecast={data.data} />);
      })
      .catch((error) => {
        setError(error.message || "Unexpected error occurred");
      });
  };

  return (
    <div className="App">
      <div className="App_container">
        {error && <p className="error-text">{error}</p>}
        <SearchBar onSearch={handleSearch} onInputStart={setIsInputStarted} />
        <GetLocationButton onGetLocation={handleGetLocation} />
        {isInputStarted && (
          <>
            <GetWeatherButton city={city} onGetWeather={handleGetWeather} />
            <GetWeatherButton city={city} onGetWeather={handleGetForecast} isForecast />
          </>
        )}
      </div>
      {weatherComponent}
    </div>
  );
}

export default App;
