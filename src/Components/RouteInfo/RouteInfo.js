import React, { useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import GetPlaceInfo from "../../Services/Maps/GetPlaceInfo";
import RouteInfoCard from "../RouteInfoCard.js/RouteInfoCard";

export default function RouteInfo({ markers }) {
  const info = markers.map((marker) => {
    return <RouteInfoCard marker={marker} key={marker.place_id} />;
  });

  return <div>{info}</div>;
}
