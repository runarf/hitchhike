import React from "react";
import styled from "styled-components";

const DisplayLocation = styled.div`
  display: block;
  position: relative;
  margin: 0px auto;
  width: 50%;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  color: #222;
  background: #fff;
`;

const GeocoderPosition: React.FC<{
  geocoderLocation: any;
}> = ({ geocoderLocation }) => {
  return (
    <DisplayLocation>
      Longitude {geocoderLocation.longitude} |
      Latitude {geocoderLocation.latitude}
      <button
        onClick={() =>
          navigator.clipboard.writeText(
            geocoderLocation.longitude.toString() +
              "," +
              geocoderLocation.latitude.toString()
          )
        }
      >
        📋
      </button>
    </DisplayLocation>
  );
};
