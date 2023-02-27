import React, { useEffect, useState } from "react";
import UserService from "../../Services/Travlog/UserService";
import ImageService from "../../Services/Images/ImageService";
import notLikedImage from "../../imgs/like.png";
import likedImage from "../../imgs/heart.png";
import routeImage from "../../imgs/route.png";
import postImage from "../../imgs/blog.png";
import timeImage from "../../imgs/time.png";
import restaurantImage from "../../imgs/restaurant.png";
import checkpointImage from "../../imgs/checkpoint.png";
import "./SimplifiedArticle.scss";
import ArticleDetails from "../../Containers/ArticleDetails/ArticleDetails";
import { useNavigate } from "react-router-dom";
import InteractionsService from "../../Services/Travlog/InteractionsService";
import GlobalService from "../../Services/Travlog/GlobalService";
import getTimeDifference from "../../Functions/timeDifference";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import routeInfoFunctions from "../../Functions/routeInfoFunctions";
import { useDispatch } from "react-redux";
import PostService from "../../Services/Travlog/PostService";
import { deleted } from "../../Features/deleteArticleSlice";

export default function SimplifiedArticle({
  article_id,
  setInteraction,
  interaction,
  firstArticle,
}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [type, setType] = useState("");
  const [article, setArticle] = useState(firstArticle);
  const [mainImage, setMainImage] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [hasRestaurant, setHasRestaurant] = useState(false);
  const [duration, setDuration] = useState();
  const loggedUser = localStorage.getItem("USER");

  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
    getArticleImage();
    hasLikedArticle();
    setHasRestaurant(routeInfoFunctions.hasRestaurant(firstArticle));
    setDuration(routeInfoFunctions.fullDuration(firstArticle));

    if (article.map) {
      setType("route");
    } else {
      setType("post");
    }
  }, [hasLiked, interaction, hasRestaurant]);

  const getArticleImage = async () => {
    const pic = await ImageService.getImage(article.city);
    setMainImage(pic);
  };

  const getUserById = async () => {
    const res = await UserService.getUserById(article.user_id);
    setUser(res.name);
    const loggedUserRole = await UserService.getUserById(loggedUser);
    setUserRole(loggedUserRole.role);
  };

  const hasLikedArticle = async () => {
    const res = await GlobalService.getRouteOrPostById(article_id);

    setArticle(res);
    if (res.upvotes.includes(loggedUser)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  };

  const handleGiveLike = async () => {
    try {
      const res = await InteractionsService.like(article._id, loggedUser);
      setInteraction(!interaction);
    } catch (error) {
      console.log(error);
    }
  };

  const handleArticleDetails = () => {
    navigate(`/article/${article._id}`);
  };

  const timeCreated = getTimeDifference.ByDate(article.createdAt);

  const handleDelete = async () => {
    if (article.map) setType("route");
    else setType("post");
    await PostService.deletePost(article._id, type);
    dispatch(deleted());
  };

  return (
    <div className="article-card">
      <div className="article-user">
        <div className="user-profile-pic"></div>
        <div>
          {user} <div className="article-location">{article.city}</div>
        </div>
        {userRole === "admin" && <button onClick={handleDelete}>X</button>}
      </div>
      <div
        onClick={handleArticleDetails}
        className="article-pic"
        style={{ backgroundImage: `url(${mainImage})` }}
      ></div>
      <div className="route-details">
        <div className="route-detail">
          <img src={timeImage} alt="" className="icon" />
          {duration}
        </div>
        <div className="route-detail">
          <img src={restaurantImage} alt="" className="icon" />
          {hasRestaurant ? <>Yes</> : <>No</>}
        </div>
        <div className="route-detail">
          <img src={checkpointImage} alt="" className="icon" />
          {article.route_description.length}
        </div>
        <div className="route-detail">
          {hasLiked ? (
            <img
              onClick={handleGiveLike}
              src={likedImage}
              alt=""
              className="icon"
            />
          ) : (
            <img
              onClick={handleGiveLike}
              src={notLikedImage}
              alt=""
              className="icon"
            />
          )}
          {article.rating}
        </div>
      </div>
      <div className="article-info">{timeCreated}</div>
    </div>
  );
}
