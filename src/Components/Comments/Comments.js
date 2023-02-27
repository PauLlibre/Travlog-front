import React, { useEffect, useState } from "react";
import getTimeDifference from "../../Functions/timeDifference";
import UserService from "../../Services/Travlog/UserService";
import "./Comments.scss";

export default function Comment({ content, date, rating, user_id }) {
  const [user, setUser] = useState("");

  const timeCreated = getTimeDifference.ByDate(date);

  useEffect(() => {
    getUser();
  }, [user_id]);

  const getUser = async () => {
    const data = await UserService.getUserById(user_id);
    setUser(data?.name || "");
  };

  return (
    <div className="comment">
      <div className="comment-user">
        <div className="user-profile-pic"></div> {user}
        <div className="comment-rating">{rating}</div>
      </div>
      <hr style={{ backgroundColor: "black", width: "100%", height: "0" }} />
      <div>{content}</div>

      <div className="article-info">{timeCreated}</div>
    </div>
  );
}
