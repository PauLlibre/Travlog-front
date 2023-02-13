import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import GetPlaceInfo from "../../Services/Maps/GetPlaceInfo";
import "./RouteInfoCard.scss";

export default function RouteInfoCard({ marker }) {
  const [routeInfo, setRouteInfo] = useState({});
  const [showTimetables, setShowTimetables] = useState(false);
  const [showPictures, setShowPictures] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  const [placeType, setPlaceType] = useState([]);
  const [time, setTime] = useState("");

  console.log(marker);

  useEffect(() => {
    RouteInfo();
  }, []);

  const RouteInfo = async () => {
    await GetPlaceInfo.getByMarker(marker.place_id, (result) => {
      setRouteInfo(result);
      setPlaceType(result.types);
    });
  };

  const areTimetables = () => {
    try {
      const res = routeInfo.current_opening_hours.weekday_text;
      return true;
    } catch {
      return false;
    }
  };

  const arePictures = () => {
    try {
      console.log(placeType);
      const res = routeInfo.photos;
      return res.map((pic) => {
        let url = pic.getUrl();
        return <img key={url} src={url} alt="Route Place"></img>;
      });
    } catch {
      return [];
    }
  };

  const areReviews = () => {
    try {
      console.log(routeInfo);

      const res = routeInfo.reviews;
      return res.map((review) => {
        return <div>{review.text}</div>;
      });
    } catch {
      return [];
    }
  };

  const placesTypeReturns = () => {
    if (placeType.includes("restaurant")) return true;
  };

  const handleTime = (ev) => {
    setTime(ev.target.value);
  };

  return (
    <div>
      {Object.keys(routeInfo).length !== 0 && (
        <>
          <div>{routeInfo.name}</div>
          <div>Address: {routeInfo.vicinity}</div>
          {showTimetables && (
            <>
              {areTimetables() &&
                routeInfo.current_opening_hours.weekday_text.map(
                  (day, index) => <div key={index}>{day}</div>
                )}
            </>
          )}
          {areTimetables() && (
            <button onClick={() => setShowTimetables(!showTimetables)}>
              Show Timetables
            </button>
          )}
          <div className="pics"> {showPictures && arePictures()}</div>

          <button onClick={() => setShowPictures(!showPictures)}>
            Show Pictures
          </button>
          <div> {showReviews && areReviews()}</div>
          <button onClick={() => setShowReviews(!showReviews)}>
            Show Reviews
          </button>
          {placesTypeReturns() && (
            <div>
              Set Normal Time to eat:
              <input
                type="number"
                value={time}
                onChange={handleTime}
                placeholder="In minutes"
              />
              minutes
            </div>
          )}
        </>
      )}
      <div>
        <label htmlFor="">Description: </label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="optional"
        ></textarea>
      </div>
    </div>
  );
}
