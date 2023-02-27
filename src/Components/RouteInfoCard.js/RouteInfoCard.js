import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import GetPlaceInfo from "../../Services/Maps/GetPlaceInfo";
import "./RouteInfoCard.scss";
import { update } from "../../Features/routeCreation";

export default function RouteInfoCard({ marker, index }) {
  const dispatch = useDispatch();
  const [routeInfo, setRouteInfo] = useState({});
  const [showTimetables, setShowTimetables] = useState(false);
  const [showPictures, setShowPictures] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);

  const [placeType, setPlaceType] = useState([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    if (index) {
      console.log("hola");
      dispatch(update({ description, time, index, duration, placeType }));
    }
  }, [time, description, duration, placeType]);

  useEffect(() => {
    if (placeType.includes("restaurant")) {
      setDuration(duration + 90 * 60);
    } else if (
      placeType.includes("tourist_attraction") ||
      placeType.includes("point_of_interest")
    ) {
      setDuration(duration + 3600);
    }
  }, [placeType]);

  useEffect(() => {
    RouteInfo();
  }, []);

  const RouteInfo = async () => {
    console.log(marker);
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
      const res = routeInfo.reviews;
      return res.map((review) => {
        return <div>{review.text}</div>;
      });
    } catch {
      return [];
    }
  };

  const placesTypeReturns = () => {
    console.log(routeInfo);
    if (placeType.includes("restaurant")) {
      return true;
    }
  };

  const handleTime = (ev) => {
    setTime(ev.target.value);
  };

  const handleDescription = (ev) => {
    setDescription(ev.target.value);
  };

  const rating = routeInfo.rating;

  return (
    <div className="waypoint-info-card-root">
      <div className="waypoint-info-card">
        {routeInfo.photos ? (
          <div
            className="waypoint-pic"
            style={{ backgroundImage: `url(${routeInfo.photos[0].getUrl()})` }}
          ></div>
        ) : (
          <></>
        )}
        {Object.keys(routeInfo).length !== 0 && (
          <div className="waypoint-info">
            <div className="waypoint-info-name">{routeInfo.name}</div>
            <div className="waypoint-info-buttons">
              {areTimetables() && (
                <button onClick={() => setShowTimetables(!showTimetables)}>
                  TIMETABLES
                </button>
              )}

              <button onClick={() => setShowPictures(!showPictures)}>
                PICTURES
              </button>
              <button onClick={() => setShowReviews(!showReviews)}>
                REVIEWS
              </button>
            </div>
          </div>
        )}
      </div>
      {index && (
        <>
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
      {index ? (
        <div>
          <label htmlFor="">Description: </label>
          <textarea
            value={description}
            onChange={handleDescription}
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="optional"
          ></textarea>
        </div>
      ) : (
        <></>
      )}
      <div className="waypoint-info-expand">
        <div> {showReviews && areReviews()}</div>
        <div>
          <div className="pics"> {showPictures && arePictures()}</div>
        </div>
        <div>
          {showTimetables && (
            <>
              {areTimetables() &&
                routeInfo.current_opening_hours.weekday_text.map(
                  (day, index) => <div key={index}>{day}</div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
