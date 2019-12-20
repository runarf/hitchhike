import React, {
  useState,
  useEffect
} from "react";
import Map from "./Map";

const getLocationPromise = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    );
  });
};

const App = () => {
  const [
    userPosition,
    setUserPosition
  ] = useState(null);

  const [
    errorMessage,
    setErrorMessage
  ] = useState(null);

  useEffect(() => {}, []);

  const getLocation = async () => {
    try {
      const position = await getLocationPromise();
      const userPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      setUserPosition(userPosition);
    } catch (error) {
      let newErrorMessage;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          newErrorMessage =
            "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          newErrorMessage =
            "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          newErrorMessage =
            "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          newErrorMessage =
            "An unknown error occurred.";
          break;
      }
      setErrorMessage(newErrorMessage);
    }
  };

  return (
    <div>
      {userPosition ? (
        <Map userPosition={userPosition} />
      ) : (
        <div>
          <button onClick={getLocation}>
            Get your location
          </button>
          {errorMessage && (
            <span>{errorMessage}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
