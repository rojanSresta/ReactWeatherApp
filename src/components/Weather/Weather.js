import "./Weather.css";
import axios from "axios";
import { useState, useEffect } from "react";

export const WeatherComponent = ({ city }) => {
  const [searchedCity, setSearchedCity] = useState(city);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "0b3abd36216e65a2eb109cf0b4b8b095";

  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day;
  let hours = currentDate.getHours();
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = currentDate.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let seconds = currentDate.getSeconds();
  seconds = seconds < 10 ? "0" + seconds : seconds;

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="cardContainer">
        <div className="bgContainer">
          <div className="searchContainer">
            <form onSubmit={handleSearch}>
              <input
                id="inputBox"
                type="text"
                name="city"
                placeholder="Search City"
                value={searchedCity}
                onChange={(e) => setSearchedCity(e.target.value)}
              />
              <button id="searchBtn" onClick={handleSearch}>
                <img id="searchImage" src="Images/search.png" alt="Search" />
              </button>
            </form>
          </div>
          <div className="showWeather">
            <div className="weatherIcon">
              {weatherData && (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt=""
                  width={250}
                />
              )}
              <div className="dateTime">
                <p className="date">Your Date: {`${year}/${month}/${day}`}</p>
                <p className="time">
                  Your Time: {`${hours}:${minutes}:${seconds}`}
                </p>
              </div>
            </div>
            <div className="mainDesc">
              <h1 style={{ fontFamily: "stencil" }}>{searchedCity}</h1>
              <div className="temp wDesc">
                <b>Temperature: </b>
                {weatherData && <p> {weatherData.main.temp} &deg; C</p>}
              </div>
              <div className="wDesc">
                {weatherData && <p>{weatherData.weather[0].description}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
