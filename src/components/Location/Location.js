import axios from "axios";
import { useState } from "react";
import { WeatherComponent } from "../Weather/Weather";
import "./Location.css";

export const LocationComponent = () => {
  const [locationEnabled, setLocationEnabled] = useState(
    localStorage.getItem("locationEnabled") === "true"
  );
  const [city, setCity] = useState("");
  const geoApiKey = "IgHzM6q0Ed6S62qmUntlFnXGHt692Yds";

  const determineCityFromCoordinates = (lat, lon) => {
    const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${geoApiKey}&location=${lat},${lon}8&includeRoadMetadata=true&includeNearestIntersection=true`;

    axios
      .get(url)
      .then((response) => {
        setCity(response.data.results[0].locations[0].adminArea4);
        setLocationEnabled(true);
        localStorage.setItem("locationEnabled", true);
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          determineCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error(`Error getting location: ${error.message}`);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div className="mainBody">
        {locationEnabled && (
          <div>
            <WeatherComponent city={city} />
            {/*  passed the value of city as props to weather component*/}
          </div>
        )}
        {!locationEnabled && (
          <div className="notEnabledContainer">
            <div className="row">
              <div className="imageCol">
                <img id="bg" alt="" src="Images/bg.jpeg" />
              </div>
              <div className="enableCol">
                <h1 id="webHeader">React Weather App</h1>
                <p id="webDesc">
                  Welcome to React Weather App, you can use this website to know
                  the weather of different places just by sitting in home. There
                  is search feature in our website which allows you to search
                  for different cities and know about it's wather conditions.
                  But before using our website you need to enable the location
                  in your browser. Please click below button to enable it and
                  enjoy knowing the weather of world.
                </p>
                <button id="enableBtn" onClick={getLocation}>
                  Enable
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
