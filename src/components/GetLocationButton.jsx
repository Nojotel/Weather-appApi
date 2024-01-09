import React from "react";

const GetLocationButton = ({ onGetLocation }) => {
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onGetLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <button className="GetLocationButton" onClick={handleClick}>
      Получить местоположение
    </button>
  );
};

export default GetLocationButton;
