import React, { useState, useRef } from "react";
import ReactMapGL, {
  GeolocateControl,
  Marker
} from "react-map-gl";
import Pin from "./pin";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "react-map-gl-geocoder";

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

  const mapRef = useRef();

  const [
    originMarker,
    setOriginMarker
  ] = useState({
    ...userPosition
  });

  const [
    destinationMarker,
    setDestinationMarker
  ] = useState(null);

  const handleGeocoderViewportChange = viewport => {
    setDestinationMarker({
      latitude: viewport.latitude,
      longitude: viewport.longitude
    });

    setViewport(viewport);
  };

  return (
    <div>
      <div className="map">
        <ReactMapGL
          ref={mapRef}
          {...viewport}
          onViewportChange={viewport =>
            setViewport(viewport)
          }
          mapStyle="mapbox://styles/mapbox/satellite-v9"
          mapboxApiAccessToken={accessToken}
        >
          <Geocoder
            onViewportChange={
              handleGeocoderViewportChange
            }
            mapRef={mapRef}
            mapboxApiAccessToken={accessToken}
          />
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{
              enableHighAccuracy: true
            }}
            trackUserLocation={true}
          />
          <Marker
            {...originMarker}
            draggable
            offsetTop={-20}
            offsetLeft={-10}
            onDragEnd={event =>
              setOriginMarker({
                longitude: event.lngLat[0],
                latitude: event.lngLat[1]
              })
            }
          >
            <Pin size={20} />
          </Marker>
          {destinationMarker && (
            <Marker
              {...destinationMarker}
              offsetTop={-20}
              offsetLeft={-10}
            >
              <Pin size={40} />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Map;
