import React, { useState } from "react";
import Home from "./Containers/Home/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import Create from "./Containers/Create/Create";
import Profile from "./Containers/Profile/Profile";
import MyPosts from "./Containers/MyPosts/MyPosts";
import RouteCreate from "./Containers/RouteCreate/RouteCreate";
import Admin from "./Containers/Admin/Admin";
import ArticleDetails from "./Containers/ArticleDetails/ArticleDetails";
import { useLoadScript } from "@react-google-maps/api";
import Footer from "./Components/Footer/Footer";

export default function App() {
  const [libraries] = useState(["places", "directions"]);

  useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries,
  });
  return (
    <div className="root">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/myPosts/:id" element={<MyPosts />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/create/route" element={<RouteCreate />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/article/:id" element={<ArticleDetails />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}
