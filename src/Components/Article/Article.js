import React, { useEffect } from "react";
import UserService from "../../Services/Travlog/UserService";
import { useState } from "react";
import getTimeDifference from "../../Functions/timeDifference";

export default function Article({
  title,
  description,
  user_id,
  comments,
  createdAt,
  rating,
  maps,
}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById();
  }, []);

  const timeCreated = getTimeDifference(createdAt);

  const getUserById = async () => {
    const result = await UserService.getUserById(user_id);
    setUser(result);
  };
  return (
    <div className="article-root">
      <div>Title: {title}</div>
      <div>Description: {description}</div>
      <div>User: {user.name}</div>
      <div>{comments}</div>
      <div>{timeCreated}</div>
      <div>{rating}</div>
    </div>
  );
}
