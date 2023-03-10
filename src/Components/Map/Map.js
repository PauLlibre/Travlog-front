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
import RouteInfo from "../RouteInfo/RouteInfo";
import { useDispatch, useSelector } from "react-redux";
import { add, retrieve } from "../../Features/routeCreation";
import PostService from "../../Services/Travlog/PostService";
import routeInfoFunctions from "../../Functions/routeInfoFunctions";

export default function Map() {
  const loc = JSON.parse(localStorage.getItem("LOC"));
  const [libraries] = useState(["places", "directions"]);
  const [location, setLocation] = useState({});
  const [center, setCenter] = useState(loc || location);
  const [markers, setMarkers] = useState([]);
  const [directions, setDirections] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [map, setMap] = useState("");
  const [duration, setDuration] = useState();
  const [distance, setDistance] = useState();
  const dispatch = useDispatch();
  const details = useSelector((state) => {
    return state.createRoute;
  });
  const user_id = localStorage.getItem("USER");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });

  const route = {
    title,
    description,
    city,
    map,
    details,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
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
    const latlng = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      place_id: event.placeId,
    };
    setMarkers((currentMarkers) => [...currentMarkers, latlng]);
    dispatch(add(latlng));
  };

  const handleGenerateRoute = () => {
    if (markers.length < 2) return;
    const waypoints = markers.slice(1, -1).map((marker) => ({
      location: marker,
      stopover: true,
    }));
    const origin = markers[0];
    const destination = markers[markers.length - 1];
    console.log(origin);
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      { origin, destination, waypoints, travelMode: "WALKING" },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          console.log(directions);
          let totalDuration = 0;
          let totalDistance = 0;
          result.routes[0].legs.forEach((leg) => {
            console.log(leg);
            totalDuration += Math.round(leg.duration.value);
            totalDistance += Math.round(leg.distance.value);
          });
          setDuration(totalDuration);
          setDistance(totalDistance);
          console.log("Total duration of the route:", totalDuration);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
    handleGetRouteInfo();
    handleShareRoute();
  };

  const handleGetRouteInfo = () => {
    return <RouteInfo markers={markers} />;
  };

  const handleShareRoute = async () => {
    if (!directions) return;
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
    const waypoints = encodeURIComponent(
      directions.request.waypoints
        .map((waypoint) => {
          const lat = waypoint.location.location.lat();
          const lng = waypoint.location.location.lng();
          return lat + "," + lng;
        })
        .join("|")
    );
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=walking`;
    setMap(url);

    window.open(url, "_blank");
  };

  const handleMarkerClick = (index) => {
    setMarkers((currentMarkers) => {
      dispatch(retrieve(index));
      return currentMarkers.filter((_, i) => i !== index);
    });
  };

  const renderMarkers = () => {
    return markers.map((marker, index) => (
      <MarkerF
        key={index}
        position={{ lat: marker.lat, lng: marker.lng }}
        onClick={() => handleMarkerClick(index)}
      />
    ));
  };

  const handleTitle = (ev) => {
    setTitle(ev.target.value);
  };

  const handleDescription = (ev) => {
    setDescription(ev.target.value);
  };

  const handleCityChange = (ev) => {
    setCity(ev.target.value);
  };

  const handleCity = (ev) => {
    ev.preventDefault();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: city.toLowerCase() }, (results, status) => {
      if (status === "OK") {
        setCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      } else {
        console.error(
          `Geocode was not successful for the following reason: ${status}`
        );
      }
    });
  };

  const handleShare = async () => {
    handleShareRoute();
    console.log(details);
    console.log(map);
    const res = await PostService.makePost(
      user_id,
      "route",
      title,
      description,
      map,
      city,
      duration,
      details,
      distance
    );
  };



  if (loadError) return "Error";

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="route-create-root">
      <div className="create-route-form-row">
        <label className="form-label" htmlFor="">
          TITLE
        </label>
        <input
          className="form-input"
          type="text"
          value={title}
          onChange={handleTitle}
        />
      </div>
      <div className="create-route-form-row">
        <label className="form-label" htmlFor="">
          DESCRIPTION
        </label>
        <input
          className="form-input"
          type="text"
          value={description}
          onChange={handleDescription}
        />
      </div>
      <div className="create-route-form-row">
        <label className="form-label" htmlFor="">
          CITY
        </label>
        <input
          className="form-input"
          type="text"
          value={city}
          onChange={handleCityChange}
        />
      </div>
      <button className="form-button create-root-form-row" onClick={handleCity}>
        SET CITY
      </button>
      <div>
        <Places setSelected={setCenter} setMarkers={setMarkers}></Places>
      </div>
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerClassName="map-container"
        onClick={handleMapClick}
      >
        {renderMarkers()}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <button className="form-button" onClick={handleGenerateRoute}>
        GENERATE ROUTE
      </button>
      <button className="form-button" onClick={handleShareRoute}>
        SHARE ROUTE
      </button>

      {handleGetRouteInfo()}
      {/* {duration && (
        <div>Duration: {routeInfoFunctions.fullDuration(duration)} hours</div>
      )} */}

      <button className="form-button" onClick={handleShare}>
        SHARE
      </button>
    </div>
  );
}
