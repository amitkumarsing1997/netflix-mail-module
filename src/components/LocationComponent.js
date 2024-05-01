import React, { useState, useEffect } from "react";

const LocationComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []); // Empty dependency array means this effect runs once after the first render

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {latitude && <p>Latitude: {latitude}</p>}
      {longitude && <p>Longitude: {longitude}</p>}
    </div>
  );
};

export default LocationComponent;
