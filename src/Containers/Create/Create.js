import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../../Services/Travlog/PostService";

export default function Create() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [map, setMap] = useState("");
  const [city, setCity] = useState("");
  const id = localStorage.getItem("USER");

  const handleSubmit = async () => {
    const res = await PostService.makePost(
      id,
      type,
      title,
      description,
      map,
      city
    );
    navigate("/");
    console.log(res);
  };

  const handleTitle = (ev) => {
    setTitle(ev.target.value);
  };

  const handleDescription = (ev) => {
    setDescription(ev.target.value);
  };

  const handleMap = (ev) => {
    setMap(ev.target.value);
  };

  const handleCity = (ev) => {
    setCity(ev.target.value);
  };

  return (
    <div>
      <label htmlFor="">TYPE</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select type</option>
        <option value="route">Route</option>
        <option value="post">Post</option>
      </select>
      <label htmlFor="">TITLE</label>
      <input type="text" onChange={handleTitle} value={title} />
      <label htmlFor="">DESCRIPTION</label>
      <textarea type="text" onChange={handleDescription} value={description} />
      {type === "route" && (
        <>
          <label htmlFor="">MAP</label>
          <input type="text" value={map} onChange={handleMap} />
          <label htmlFor="">CITY</label>
          <input type="text" value={city} onChange={handleCity} />
        </>
      )}
      <label htmlFor="">PHOTOS</label>
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  );
}
