import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Places from "../Places/Places";
import "./Map.scss";

export default function Map() {
  const loc = JSON.parse(localStorage.getItem("LOC"));
  const [libraries] = useState(["places", "directions"]);
  const [location, setLocation] = useState({});
  const [selected, setSelected] = useState(loc || location);
  const [markers, setMarkers] = useState([]);
  const [directions, setDirections] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDNaZDILHnFdvAkqphbTIItV82nnsVTJNU",
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setSelected({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        localStorage.setItem(
          "LOC",
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      });
    }
  }, []);

  const handleMapClick = (event) => {
    console.log(event);
    const latlng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers((currentMarkers) => [...currentMarkers, latlng]);
    console.log(markers);
  };

  const handleGenerateRoute = () => {
    if (markers.length < 2) return;
    const waypoints = markers.slice(1, -1).map((marker) => ({
      location: marker,
      stopover: true,
    }));
    const origin = markers[0];
    const destination = markers[markers.length - 1];
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      { origin, destination, waypoints, travelMode: "WALKING" },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };
  const center = useMemo(() => selected, [selected]);

  const handleShareRoute = () => {
    if (!directions) return;
    console.log(directions);
    const origin = encodeURIComponent(
      (() => {
        const lat = directions.request.origin.location.lat();
        const lng = directions.request.origin.location.lng();
        return lat + "," + lng;
      })()
    );

    const destination = encodeURIComponent(
      (() => {
        const lat = directions.request.destination.location.lat();
        const lng = directions.request.destination.location.lng();
        return lat + "," + lng;
      })()
    );
    console.log(directions.geocoded_waypoints);
    const waypoints = encodeURIComponent(
      directions.request.waypoints
        .map((waypoint) => {
          const lat = waypoint.location.location.lat();
          const lng = waypoint.location.location.lng();
          console.log(lat);
          console.log(lng);
          return lat + "," + lng;
        })
        .join("|")
    );
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`;
    console.log(url);
    // You can now use the URL to share the route.
    // You could open it in a new tab, copy it to the clipboard, or share it through a third-party service.
    window.open(url, "_blank");
  };

  if (loadError) return "Error";

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <div>
        <Places setSelected={setSelected} setMarkers={setMarkers}></Places>
      </div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <MarkerF key={index} position={marker} />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <button onClick={handleGenerateRoute}>GENERATE ROUTE</button>
      <button onClick={handleShareRoute}>SHARE ROUTE</button>
    </>
  );
}
