import React, { useEffect } from "react";
import GlobalService from "../../Services/Travlog/GlobalService";
import { useState } from "react";
import Article from "../Article/Article";
import "./Feed.scss";
import SimplifiedArticle from "../SimplifiedArticle/SimplifiedArticle";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [interaction, setInteraction] = useState(false);

  useEffect(() => {
    getFeed();
  }, [interaction]);

  const getFeed = async () => {
    const result = await GlobalService.getEverythingSorted();
    setFeed(result);
  };
  const articleDetail = feed.map((article) => {
    return (
      <Article
        title={article.title}
        key={article._id}
        description={article.description}
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

  const feedList = feed.map((article) => {
    return (
      <SimplifiedArticle
        article_id={article._id}
        firstArticle={article}
        setInteraction={setInteraction}
        interaction={interaction}
      />
    );
  });

  return (
    <>
      <div className="feed-root">{feedList}</div>
    </>
  );
}
