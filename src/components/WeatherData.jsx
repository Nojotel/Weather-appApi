import React, { useEffect } from "react";

const WeatherData = ({ weather }) => {
  useEffect(() => {
    console.log("WeatherData renders with data:", weather);
  }, [weather]);

  if (!weather) {
    return <p className="WeatherData">Не выбран город</p>;
  }

  const {
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    weather: [{ icon, description }],
    wind: { speed, deg },
    sys: { sunrise, sunset },
  } = weather;

  const toCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

  return (
    <div className="WeatherData">
      <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={`Weather icon for ${icon}`} />
      <p>Температура: {toCelsius(temp)}°C</p>
      <p>Ощущается как: {toCelsius(feels_like)}°C</p>
      <p>Минимальная температура: {toCelsius(temp_min)}°C</p>
      <p>Максимальная температура: {toCelsius(temp_max)}°C</p>
      <p>Давление: {pressure} hPa</p>
      <p>Влажность: {humidity}%</p>
      <p>Описание: {description}</p>
      <p>
        Скорость ветра: {speed} м/с, Направление: {deg}°
      </p>
      <p>Время восхода солнца: {new Date(sunrise * 1000).toLocaleTimeString()}</p>
      <p>Время заката солнца: {new Date(sunset * 1000).toLocaleTimeString()}</p>
    </div>
  );
};

export default WeatherData;
