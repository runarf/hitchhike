import React, { useState } from "react";
import ReactMapGL, { Layer } from "react-map-gl";

const parkLayer = {
  id: "landuse_park",
  type: "fill",
  source: "mapbox",
  "source-layer": "landuse",
  filter: ["==", "class", "park"]
};

const accessToken =
  "pk.eyJ1IjoicnVuYXJmIiwiYSI6ImNrNGR6MHFqejAxcnUzZXJ2and2OHdpaGoifQ.AIIRbX4IQotcSMyWX4ga5Q";

const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.78,
    longitude: -122.41,
    width: "100vw",
    height: "100vh",
    zoom: 16
  });

  const parkLayer = {
    id: "landuse_park",
    type: "fill",
    source: "mapbox",
    "source-layer": "landuse",
    filter: ["==", "class", "park"]
  };

  const parkColor = "#dea";
  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxApiAccessToken={accessToken}
      >
        <Layer
          {...parkLayer}
          paint={{ "fill-color": parkColor }}
        />
      </ReactMapGL>
    </div>
  );
};

export default Map;
