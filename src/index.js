import ReactDOM from "react-dom/client";
// import { WeatherComponent } from "./components/Weather/Weather";
import { CityProvider } from "./context/CityContext";
import { LocationComponent } from "./components/Location/Location";

const App = () => {
  return (
    <>
      <CityProvider>
        <LocationComponent />
      </CityProvider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
