import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = (loc: any) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      },
    });
  };

  const onError = (error: any) => {
    if (error.code === 1) {
      setLocation({
        loaded: true,
        coordinates: {
          lat: -7.759467710815276,
          lng: 110.40581597989105,
        },
      });
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;
