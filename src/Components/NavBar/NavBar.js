import React from "react";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <div className="nav-bar">
      <ul>
        <li>Home</li>
        <div className="search-bar">
          <input type="text" />
        </div>
        <li>LogIn</li>
        <li>Register</li>
      </ul>
    </div>
  );
}
