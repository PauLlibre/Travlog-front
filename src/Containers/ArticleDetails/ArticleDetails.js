import { useLoadScript } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../../Components/Comments/Comments";
import RouteInfoCard from "../../Components/RouteInfoCard.js/RouteInfoCard";
import routeInfoFunctions from "../../Functions/routeInfoFunctions";
import getTimeDifference from "../../Functions/timeDifference";
import GlobalService from "../../Services/Travlog/GlobalService";
import InteractionsService from "../../Services/Travlog/InteractionsService";
import UserService from "../../Services/Travlog/UserService";
import "./ArticleDetails.scss";

export default function ArticleDetails() {
  const { id } = useParams();
  const [route, setRoute] = useState({});
  const [user, setUser] = useState({});
  const [duration, setDuration] = useState();
  const [time, setTime] = useState();
  const [mapImage, setMapImage] = useState("");
  const [content, setContent] = useState("");
  const [submit, setIsSubmit] = useState(false);
  const [showWaypointDetails, setShowWaypointDetails] = useState(false);

  useEffect(() => {
    fetchData();
  }, [showWaypointDetails]);

  const fetchData = async () => {
    const fetchedRoute = await GlobalService.getRouteOrPostById(id);
    setRoute(fetchedRoute);
    const fetchedUser = await UserService.getUserById(fetchedRoute.user_id);
    setUser(fetchedUser);
    const durationCalc = routeInfoFunctions.fullDuration(fetchedRoute);
    setDuration(durationCalc);
    const time = getTimeDifference.ByDate(fetchedRoute.updatedAt);
    setTime(time);

    setMapImage(fetchedRoute.map);
  };

  const WaypointDetails = route.route_description
    ? route.route_description.map((waypoint) => {
        return <RouteInfoCard marker={waypoint} />;
      })
    : null;

  //PRINT THE COMMENTS
  const printComments = route.comments
    ? route.comments.map((comment) => {
        return (
          <Comment
            content={comment.content}
            user_id={comment.user_id}
            rating={comment.rating}
            date={comment.updatedAt}
            key={comment._id}
          />
        );
      })
    : null;

  const handleChange = (ev) => {
    setContent(ev.target.value);
  };

  const handleMakeComment = async () => {
    try {
      const user = localStorage.getItem("USER");

      await InteractionsService.makeComment(id, user, content);
      setContent("");
      setIsSubmit(!submit);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="route-details-root">
      <div className="route-details-2-col">
        <div className="route-details-2-col-1 ">
          <div className="user-profile-pic"></div>
          <div className="span">{user.name}</div>
          <div className="article-info">{time}</div>
        </div>
        <div className="route-details-2-col-1">
          <div className="route-details-info">Estimated Duration:</div>
          <div>{duration}</div>
        </div>
      </div>
      <div className="route-details-1-col">
        <img
          className="route-details-map"
          src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=color:0x0000ff|weight:5|45.42496164444327,12.3321533203125|45.434900311545114,12.334470748901367|45.434177558402325,12.338418960571289|45.441103561983795,12.331552505493164|45.43086482139329,12.331466674804688&markers=icon:https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png|label:R|45.42496164444327,12.3321533203125|45.43086482139329,12.331466674804688&key=${process.env.REACT_APP_API_KEY}`}
          alt=""
        />
      </div>

      <div className="route-details-buttons">
        <button onClick={() => setShowWaypointDetails(!showWaypointDetails)}>
          SHOW DETAILS
        </button>
        <button
          onClick={() => {
            navigator.clipboard
              .writeText(route.map)
              .then(() => {
                alert("The link has been copied to your clipboard!");
              })
              .catch((err) => {
                console.error("Could not copy link: ", err);
              });
          }}
        >
          COPY LINK
        </button>

        <button>
          <a href={route.map} target="_blank">
            OPEN MAPS
          </a>
        </button>
      </div>
      <div className="waypoint-details-container">
        {showWaypointDetails && WaypointDetails}
      </div>
      <div className="route-details-buttons">
        <input
          className="form-input"
          type="text"
          onChange={handleChange}
          value={content}
        />
        <button className="form-button" onClick={handleMakeComment}>
          SUBMIT
        </button>
      </div>
      <div className="route-details-comments">{printComments}</div>
    </div>
  );
}
