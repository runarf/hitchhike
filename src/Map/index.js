import React, { useState } from "react";
import ReactMapGL, {
  GeolocateControl
} from "react-map-gl";

const accessToken =
  "pk.eyJ1IjoicnVuYXJmIiwiYSI6ImNrNGR6MHFqejAxcnUzZXJ2and2OHdpaGoifQ.AIIRbX4IQotcSMyWX4ga5Q";

const geolocateStyle = {
  float: "left",
  margin: "50px",
  padding: "10px"
};

const Map = ({ userPosition }) => {
  const [viewport, setViewport] = useState({
    ...userPosition,
    width: "100vw",
    height: "100vh",
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
          mapStyle="mapbox://styles/mapbox/satellite-v9"
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
};

export default Map;
