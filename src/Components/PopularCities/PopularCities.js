import React, { useEffect, useState } from "react";
import ImageService from "../../Services/Images/ImageService";
import "./PopularCities.scss";

export default function PopularCities({ city }) {
  const [img, setImg] = useState("");

  useEffect(() => {
    getImg();
  }, [img]);

  const getImg = async () => {
    const res = await ImageService.getImage(city);
    setImg(res);
  };
  return (
    <div
      className="recommended-city"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="city-name">{city}</div>
    </div>
  );
}
