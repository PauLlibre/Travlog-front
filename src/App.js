import React from "react";
import Home from "./Containers/Home/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import Create from "./Containers/Create/Create";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}
