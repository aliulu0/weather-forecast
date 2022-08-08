import JsonCity from "../data/cities_of_turkey.json";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const api = {
  key: 'bf386e35b5e74cf2e4d18cf10ed3295d',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const WeatherContext = createContext();
export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState(JsonCity.find(item => item.id === 43));
  const [oneCity, setOneCity] = useState([]);
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const { data } = await axios.get(
          `${api.base}onecall?lat=${city.latitude}&lon=${city.longitude}&units=metric&appid=${api.key}`
        );
        setWeatherData(data.daily);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getOneCity = async () => {
      try {
        const { data } = await axios.get(
          `${api.base}weather?lat=${city.latitude}&lon=${city.longitude}&units=metric&appid=${api.key}`
        );
        setOneCity(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getWeatherData();
    getOneCity();
   
  }, [city]);

  const days = {
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    long: [
      "Sunday",
      "Monday",
      "Tuesday ",
      "Wednesday ",
      "Thursday ",
      "Friday ",
      "Saturday "
    ]
  };
  const values = {
    weatherData,
    setWeatherData,
    city,
    setCity,
    days,
    JsonCity,
    oneCity,
    setOneCity,
    
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
