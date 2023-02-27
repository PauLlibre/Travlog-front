import React, { useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Feed from "../../Components/Feed/Feed";
import travlogLogo from "../../imgs/travlog-blue.png";
import "./Home.scss";
import PopularCities from "../../Components/PopularCities/PopularCities";

export default function Home() {
  const [popularCities, setPopularCities] = useState([
    "Barcelona",
    "Berlin",
    "Rome",
    "Paris",
    "Brussels",
    "Seville",
  ]);

  const printPopularCities = popularCities.map((city) => {
    return <PopularCities key={city} city={city} />;
  });

  return (
    <>
      <div className="header">
        <img src={travlogLogo} alt="" className="logo" />
      </div>
      <SearchBar />
      <div className="recommendations">{printPopularCities}</div>
      <Feed />
    </>
  );
}
