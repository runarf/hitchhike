import React, { useState } from "react";
import "./App.css";
import ReactMapGL, {
  Marker,
  GeolocateControl
} from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

const accessToken =
  "pk.eyJ1IjoicnVuYXJmIiwiYSI6ImNrNGR6MHFqejAxcnUzZXJ2and2OHdpaGoifQ.AIIRbX4IQotcSMyWX4ga5Q";

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px"
};

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 42.430472,
    longitude: -123.334102,
    zoom: 16
  });

  return (
    <div>
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
        </ReactMapGL>
      </div>
    </div>
  );
}

export default App;
