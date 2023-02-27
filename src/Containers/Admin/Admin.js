import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Article from "../../Components/Article/Article";
import SimplifiedArticle from "../../Components/SimplifiedArticle/SimplifiedArticle";
import GlobalService from "../../Services/Travlog/GlobalService";
import UserService from "../../Services/Travlog/UserService";
import travlogLogo from "../../imgs/travlog-blue.png";
import "./Admin.scss";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  //TODO MOVE TO SERVICE
  const TOKEN = localStorage.getItem("auth-token");
  const ArticleDeleted = useSelector((state) => {
    return state.deleteArticle.isDeleted;
  });

  useEffect(() => {
    getAllUsers();
    getAllArticles();
  }, [ArticleDeleted]);

  const getAllUsers = async () => {
    const res = await UserService.getAllUsers(TOKEN);
    setUsers(res.data.data);
  };

  const getAllArticles = async () => {
    const res = await GlobalService.getEverythingSorted();
    console.log(res);
    setArticles(res);
  };

  const handleUserDelete = async (id) => {
    await UserService.deleteById(TOKEN, id);
    getAllUsers();
  };

  const printUsers = users.map((user) => {
    if (user.role === "admin") {
      return null;
    }
    return (
      <div className="user-card" key={user._id}>
        {user.name}
        <button
          className="form-button"
          onClick={() => handleUserDelete(user._id)}
        >
          DELETE
        </button>
      </div>
    );
  });

  const printArticles = articles.map((article) => {
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
      />
    );
  });

  return (
    <div className="admin-panel-root">
      <div className="admin-panel-logo">
        <img src={travlogLogo} alt="" className="logo" />
      </div>
      <div className="users-container">{printUsers}</div>
      <div>{printArticles}</div>
    </div>
  );
}
