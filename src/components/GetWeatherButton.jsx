import React, { useState } from "react";
import OpenWeatherMapService from "../services/OpenWeatherMapService";

const GetWeatherButton = ({ city, onGetWeather, isForecast }) => {
  const [, setWeather] = useState(null);

  const handleClick = () => {
    if (!city) {
      console.error("Город не введен");
      return;
    }

    const service = new OpenWeatherMapService();
    if (isForecast) {
      service.getForecast(city).then((data) => {
        setWeather(data);
        onGetWeather(data);
      });
    } else {
      service.getWeather(city).then((data) => {
        setWeather(data);
        onGetWeather(data);
      });
    }
  };

  return (
    <div>
      {city && (
        <button className="GetWeatherButton" onClick={handleClick}>
          {isForecast ? "Получить прогноз на ближайшие 5 дней" : "Получить погоду на текущее время"}
        </button>
      )}
    </div>
  );
};

export default GetWeatherButton;
