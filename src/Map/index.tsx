import React, {
  useEffect,
  useState,
  useRef,
  MutableRefObject
} from "react";
import mapboxgl from "mapbox-gl";
import "./site.css";
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

const Application: React.FC<{
  userPosition: Position;
}> = ({ userPosition }) => {
  const [state, setState] = useState<stateType>({
    longitude: userPosition.longitude,
    latitude: userPosition.latitude,
    zoom: 10
  });

  const mapContainer = useRef<HTMLDivElement>(
    null!
  );

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [state.longitude, state.latitude],
      zoom: state.zoom
    });

    map.on("move", () => {
      const newState: stateType = {
        longitude: parseFloat(
          map.getCenter().lng.toFixed(4)
        ),
        latitude: parseFloat(
          map.getCenter().lat.toFixed(4)
        ),
        zoom: parseFloat(map.getZoom().toFixed(2))
      };
      setState(newState);
    });

    const marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([
        userPosition.longitude,
        userPosition.latitude
      ])
      .addTo(map);
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
