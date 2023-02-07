import React, { useEffect } from "react";
import UserService from "../../Services/Travlog/UserService";
import { useState } from "react";
import getTimeDifference from "../../Functions/timeDifference";
import ImageService from "../../Services/Images/ImageService";
import "./Article.scss";
import Comments from "../Comments/Comments";
import InteractionsService from "../../Services/Travlog/InteractionsService";
import GlobalService from "../../Services/Travlog/GlobalService";

export default function Article({
  title,
  description,
  user_id,
  createdAt,
  rating,
  maps,
  city,
  id,
}) {
  const [user, setUser] = useState({});
  const [image, setImage] = useState();
  const [content, setContent] = useState("");
  const [submit, setIsSubmit] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserById();
    getImage();
    getArticle();
  }, [submit]);

  const getArticle = async () => {
    const res = await GlobalService.getRouteOrPostById(id);
    setComments(res.comments);
  };

  const timeCreated = getTimeDifference(createdAt);

  const getUserById = async () => {
    const result = await UserService.getUserById(user_id);
    setUser(result);
  };
  const getImage = async () => {
    if (city) {
      const result = await ImageService.getImage(city);
      return setImage(result);
    }
  };

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

  const printComments = comments.map((comment) => {
    return (
      <Comments
        content={comment.content}
        user_id={comment.user_id}
        rating={comment.rating}
        date={comment.updatedAt}
        key={comment._id}
      />
    );
  });

  return (
    <div className="article-root">
      <div>Title: {title}</div>
      <div>Description: {description}</div>
      <div>User: {user.name}</div>

      <div>{timeCreated}</div>
      <div>{rating}</div>
      <div>{maps}</div>
      <div>{image ? <img src={image} /> : <div></div>}</div>
      <div>
        Comments: {comments.length}
        {printComments}
      </div>
      <div>
        <input type="text" onChange={handleChange} value={content} />
        <button onClick={handleMakeComment}>SUBMIT</button>
      </div>
    </div>
  );
}
