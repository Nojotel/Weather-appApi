import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ForecastData = ({ forecast }) => {
  const toCelsius = (temp) => temp - 273.15;

  const [, setCurrentDateIndex] = useState(0);

  if (!forecast || !forecast.list || forecast.list.length === 0) {
    return <p className="ForecastData">No forecast data available</p>;
  }

  const groupByDate = () => {
    const grouped = {};
    forecast.list.forEach((forecastItem) => {
      const date = forecastItem.dt_txt.split(" ")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(forecastItem);
    });
    return Object.values(grouped);
  };

  const groupedForecasts = groupByDate();

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentDateIndex(index),
  };

  return (
    <div className="ForecastData">
      <Slider {...sliderSettings}>
        {groupedForecasts.map((group, index) => (
          <div key={index}>
            {group.length > 0 && (
              <div className="WeatherData">
                <h3>{new Date(group[0].dt_txt).toLocaleDateString()}</h3>
                <img src={`https://openweathermap.org/img/wn/${group[0].weather[0].icon}.png`} alt={`Weather icon`} />
                <p>Температура: {toCelsius(group.reduce((sum, item) => sum + item.main.temp, 0) / group.length).toFixed(2)}°C</p>
                <p>Минимальная температура: {toCelsius(Math.min(...group.map((item) => item.main.temp_min))).toFixed(2)}°C</p>
                <p>Максимальная температура: {toCelsius(Math.max(...group.map((item) => item.main.temp_max))).toFixed(2)}°C</p>
                <p>Давление: {group[0].main.pressure} hPa</p>
                <p>Влажность: {group[0].main.humidity}%</p>
                <p>Описание: {group[0].weather[0].description}</p>
                <p>
                  Скорость ветра: {group[0].wind.speed} м/с, Направление: {group[0].wind.deg}°
                </p>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ForecastData;
