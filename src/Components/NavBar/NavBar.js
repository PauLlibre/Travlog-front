import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/Travlog/UserService";
import TokenStorageService from "../../Services/Travlog/TokenStorageService";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Features/loginSlice";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => {
    return state.login.loggedIn;
  });
  console.log(loginState);
  const user_id = localStorage.getItem("USER");

  const [user, setUser] = useState("");

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const result = await UserService.getUserById(user_id);
    console.log(result);
    setUser(result.name);
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleCreate = () => {
    navigate("/create");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    TokenStorageService.logOut();
    dispatch(logout());

    navigate("/");
  };

  const handleProfile = () => {
    navigate("/")
  }

  return (
    <div className="nav-bar">
      <ul>
        <li onClick={handleHome}>Home</li>
        <div className="search-bar">
          <input type="text" />
        </div>
        {loginState ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li onClick={handleLogin}>LogIn</li>
        )}

        <li onClick={handleRegister}>Register</li>
        <li onClick={handleCreate}>+</li>
        <li>{loginState ? <div onClick={handleProfile}>{user}</div> : <div></div>}</li>
      </ul>
    </div>
  );
}
