import React, { useEffect, useState } from "react";
import GlobalService from "../../Services/Travlog/GlobalService";
import Article from "../../Components/Article/Article";
import { useSelector } from "react-redux";
import SimplifiedArticle from "../../Components/SimplifiedArticle/SimplifiedArticle";
import "./MyPosts.scss";

export default function MyPosts() {
  const [type, setType] = useState("all");
  const [article, setArticle] = useState([]);
  const ArticleDeleted = useSelector((state) => {
    return state.deleteArticle.isDeleted;
  });

  const user_id = localStorage.getItem("USER");

  useEffect(() => {
    getAllPosts();
  }, [type, ArticleDeleted]);

  const getAllPosts = async () => {
    const res = await GlobalService.getRouteOrPostByUserId(user_id, type);
    setArticle(res);
  };

  const ArticlesList = article.map((article) => {
    return (
      <SimplifiedArticle
        article_id={article._id}
        key={article._id}
        firstArticle={article}
        user_id={article.user_id}
        comments={article.comments}
        rating={article.rating}
        createdAt={article.createdAt}
        maps={article.map}
        city={article.city}
        id={article._id}
        profile={true}
      />
    );
  });

  return (
    <div className="my-posts-root">
      <div className="select">
        FILTER
        <select
          className="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select type</option>
          <option value="route">Route</option>
          <option value="post">Post</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="feed-root">{ArticlesList}</div>
    </div>
  );
}
