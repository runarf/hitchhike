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

function getCoords() {
  return new Promise((resolve, reject) =>
    navigator.permissions
      ? // Permission API is implemented
        navigator.permissions
          .query({
            name: "geolocation"
          })
          .then(permission =>
            // is geolocation granted?
            permission.state === "granted"
              ? navigator.geolocation.getCurrentPosition(
                  pos => resolve(pos)
                )
              : reject(null)
          )
      : // Permission API was not implemented
        reject(
          new Error(
            "Permission API is not supported"
          )
        )
  );
}

const App = () => {
  const [loading, setLoading] = useState(true);

  const [
    userPosition,
    setUserPosition
  ] = useState(null);

  const [
    errorMessage,
    setErrorMessage
  ] = useState(null);

  useEffect(() => {
    const getUserPositionIfAllowed = async () => {
      try {
        const position = await getCoords();
        const userPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setUserPosition(userPosition);
      } finally {
        setLoading(false);
      }
    };

    getUserPositionIfAllowed();
  }, []);

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
      {loading ? (
        <span>Loading...</span>
      ) : userPosition ? (
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
