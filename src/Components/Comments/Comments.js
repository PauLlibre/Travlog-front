import React, { useEffect, useState } from "react";
import getTimeDifference from "../../Functions/timeDifference";
import UserService from "../../Services/Travlog/UserService";

export default function Comments({ content, date, rating, user_id }) {
  const [user, setUser] = useState([]);
  const timeCreated = getTimeDifference(date);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const data = await UserService.getUserById(user_id);
    setUser(data.name);
  };

  return (
    <div>
      <div>{user}</div>
      <div>{timeCreated}</div>
      <div>{content}</div>
      <div>{rating}</div>
    </div>
  );
}
