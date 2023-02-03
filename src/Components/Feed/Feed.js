import React, { useEffect } from "react";
import GlobalService from "../../Services/Travlog/GlobalService";
import { useState } from "react";
import Article from "../Article/Article";
import "./Feed.scss"

export default function Feed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    const result = await GlobalService.getEverythingSorted();
    setFeed(result);
  };
  console.log(feed);
  const feedList = feed.map((article) => {
    return (
      <Article
        title={article.title}
        key={article._id}
        description={article.description}
        user_id={article.user_id}
        comments={article.comments}
        rating={article.rating}
        createdAt={article.createdAt}
      />
    );
  });

  return <div className="feed-root">{feedList}</div>;
}
