import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import GetPlaceInfo from "../../Services/Maps/GetPlaceInfo";
import RouteInfoCard from "../RouteInfoCard.js/RouteInfoCard";
import { useSelector } from "react-redux";

export default function RouteInfo({ markers }) {
  const info = markers.map((marker, index) => {
    return (
      <div key={marker.place_id}>
        <RouteInfoCard marker={marker} key={marker.place_id} index={index} />
      </div>
    );
  });

  return <div>{info}</div>;
}
