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
  const update = useSelector((state) => {
    return state.deleteArticle.isDeleted;
  });
  const loginState = useSelector((state) => {
    return state.login.loggedIn;
  });
  const user_id = localStorage.getItem("USER");

  const [user, setUser] = useState("");

  useEffect(() => {
    getUserById();
  }, [update]);

  const getUserById = async () => {
    const result = await UserService.getUserById(user_id);
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

  const handleMyPosts = () => {
    navigate(`/myPosts/${user_id}`);
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
    navigate(`/profile/${user_id}`);
  };

  return (
    <div className="nav-bar">
      <ul>
        <li onClick={handleHome}>Home</li>
        <div className="search-bar">
          <input type="text" />
        </div>
        {loginState ? <></> : <li onClick={handleRegister}>Register</li>}
        {loginState ? <li onClick={handleCreate}>+</li> : <></>}

        <ul>
          {loginState ? (
            <li>
              <div className="user-dropdown">
                <div onClick={handleProfile}>{user}</div>
                <div className="user-dropdown-content">
                  <a onClick={handleProfile}>Profile</a>
                  <a onClick={handleMyPosts}>My Posts</a>
                  <a onClick={handleLogout}>Logout</a>
                </div>
              </div>
            </li>
          ) : (
            <li onClick={handleLogin}>Login</li>
          )}
        </ul>
      </ul>
    </div>
  );
}
