import React, {
  useEffect,
  useState,
  useRef
} from "react";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import polyline from "@mapbox/polyline";
import "./site.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { RootObject } from "../types/routeType";
const accessToken =
  "pk.eyJ1IjoicnVuYXJmIiwiYSI6ImNrNGR6MHFqejAxcnUzZXJ2and2OHdpaGoifQ.AIIRbX4IQotcSMyWX4ga5Q";

mapboxgl.accessToken = accessToken;

interface stateType {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface Position {
  longitude: number;
  latitude: number;
}

const createDirections = () => {
  console.log(MapboxDirections);
  const directions = new MapboxDirections({
    accessToken,
    profile: "mapbox/driving",
    profileSwitcher: false,
    unit: "metric",
    instructions: false,
    flyTo: false,
    inputs: false
  });

  return directions;
};

const addGeolocateControl = (
  map: mapboxgl.Map
) => {
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
  );
};

const Application: React.FC<{
  userPosition: Position;
}> = ({ userPosition }) => {
  const [state, setState] = useState<stateType>({
    longitude: userPosition.longitude,
    latitude: userPosition.latitude,
    zoom: 10
  });

  const [map, setMap] = useState<Map | null>(
    null
  );
  const [route, setRoute] = useState([]);

  const [
    geocoderLocation,
    setGeocoderLocation
  ] = useState({ longitude: 0, latitude: 0 });

  const mapContainer = useRef<HTMLDivElement>(
    null!
  );

  const addGeocoder = (map: mapboxgl.Map) => {
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      countries: "no",
      bbox: [17.9646, 69.5147, 19.7939, 69.8976]
    });

    geocoder.on("result", ({ result }: any) => {
      debugger;
      const [
        longitude,
        latitude
      ] = result.geometry.coordinates;

      setGeocoderLocation({
        longitude,
        latitude
      });
    });

    map.addControl(geocoder);
  };

  const addMarker = (map: mapboxgl.Map) => {
    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([
        userPosition.longitude,
        userPosition.latitude
      ])
      .addTo(map);

    marker.on("dragend", () => {
      //const lngLat: mapboxgl.LngLat = marker.getLngLat();
    });
  };

  const setDirectionsStartAndStop = directions => {
    const tromsoLngLat = [18.955324, 69.649208];
    const dalenLngLat = [18.998619, 69.64444];

    map?.on("load", () => {
      directions.setOrigin(tromsoLngLat);
      directions.setDestination(dalenLngLat);
    });
  };

  useEffect(() => {
    if (map != null) {
      map.on("move", () => {
        const newState: stateType = {
          longitude: parseFloat(
            map.getCenter().lng.toFixed(4)
          ),
          latitude: parseFloat(
            map.getCenter().lat.toFixed(4)
          ),
          zoom: parseFloat(
            map.getZoom().toFixed(2)
          )
        };
        setState(newState);
      });

      //addGeocoder(map);
      //addMarker(map);
      const directions = createDirections();

      setDirectionsStartAndStop();

      map.addControl(directions, "top-left");

      directions.on(
        "route",
        (event: RootObject) => {
          console.log(event);
          const converted = polyline.decode(
            event.route[0].geometry
          );
          console.log(converted);
        }
      );

      //addGeolocateControl(map);
    }
  }, [map]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [state.longitude, state.latitude],
      zoom: state.zoom
    });

    setMap(map);
  }, []);

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {state.longitude} | Latitude:{" "}
          {state.latitude} | Zoom: {state.zoom}
        </div>
      </div>
      <div
        ref={mapContainer}
        className="mapContainer"
      />
    </div>
  );
};

export default Application;
