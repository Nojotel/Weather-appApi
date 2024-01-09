import axios from "axios";

const apiKey = "fc00f35285798a68db0394a63ccf3ffe";
const apiUrl = "https://api.openweathermap.org/data/2.5";

export default class OpenWeatherMapService {
  handleError = (error) => {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      return { message: "Город введен не верно" };
    }
    return Promise.reject(error);
  };

  makeRequest = (endpoint, params) => {
    const url = `${apiUrl}/${endpoint}`;
    const config = { params: { ...params, appid: apiKey } };

    return axios.get(url, config).catch(this.handleError);
  };

  getWeather(city) {
    return this.makeRequest("weather", { q: city });
  }

  getForecast(city) {
    return this.makeRequest("forecast", { q: city });
  }

  getWeatherByCoordinates(latitude, longitude) {
    return this.makeRequest("weather", { lat: latitude, lon: longitude });
  }

  getForecastByCoordinates(latitude, longitude) {
    return this.makeRequest("forecast", { lat: latitude, lon: longitude });
  }
}
