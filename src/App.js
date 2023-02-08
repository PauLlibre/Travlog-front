import React from "react";
import Home from "./Containers/Home/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import Create from "./Containers/Create/Create";
import Profile from "./Containers/Profile/Profile";
import MyPosts from "./Containers/MyPosts/MyPosts";

export default function App() {
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
