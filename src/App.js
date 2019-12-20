import React, {
  useState,
  useEffect
} from "react";
import "./App.css";
import ReactMapGL, {
  Marker,
  GeolocateControl
} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

import pin from "./pin.svg";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const accessToken =
  "pk.eyJ1IjoicnVuYXJmIiwiYSI6ImNrNGR6MHFqejAxcnUzZXJ2and2OHdpaGoifQ.AIIRbX4IQotcSMyWX4ga5Q";

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px"
};

const getUpdatedUserLocation = () => {
  const currentPositionPromise = new Promise(
    resolve => {
      navigator.geolocation.getCurrentPosition(
        position => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          resolve(userLocation);
        }
      );
    }
  );
  return currentPositionPromise;
};

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 42.430472,
    longitude: -123.334102,
    zoom: 16
  });

  const [
    userLocation,
    setUserLocation
  ] = useState(null);

  const moveMapToUserLocation = async () => {
    const updatedUserLocation = await getUpdatedUserLocation();
    const newViewport = {
      ...updatedUserLocation,
      height: "100vh",
      width: "100vw",
      zoom: 12
    };
    setViewport(newViewport);

    setUserLocation(updatedUserLocation);
  };

  return (
    <div>
      <button onClick={moveMapToUserLocation}>
        My Location
      </button>
      <div className="map">
        <ReactMapGL
          {...viewport}
          onViewportChange={viewport =>
            setViewport(viewport)
          }
          mapStyle="mapbox://styles/mapbox/outdoors-v11"
          mapboxApiAccessToken={accessToken}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{
              enableHighAccuracy: true
            }}
            trackUserLocation={true}
          />
          {userLocation && (
            <Marker
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
            >
              <img
                className="location-icon"
                src={pin}
                alt="pin"
              />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
