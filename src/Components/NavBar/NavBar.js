import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";
import UserService from "../../Services/Travlog/UserService";
import TokenStorageService from "../../Services/Travlog/TokenStorageService";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Features/loginSlice";
import homeImage from "../../imgs/home1.png";
import createImage from "../../imgs/create.png";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.login);
  const { isDeleted } = useSelector((state) => state.deleteArticle);

  const user_id = localStorage.getItem("USER");

  const [user, setUser] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getUserById();
  }, [isDeleted, loggedIn]);

  const getUserById = async () => {
    const result = await UserService.getUserById(user_id);
    setUser(result?.name || "");
    setIsAdmin(result?.role === "admin");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleUserLogout = () => {
    TokenStorageService.logOut();
    dispatch(logout());
    navigate("/");
  };

  const handleUserProfile = () => {
    navigate(`/profile/${user_id}`);
  };

  const handleMyUserPosts = () => {
    navigate(`/myPosts/${user_id}`);
  };

  const handleHomePage = () => {
    navigate("/");
  };

  const handleUserCreation = () => {
    navigate("/create/route");
  };

  const handleUserRegistration = () => {
    navigate("/register");
  };

  const handleAdminPanel = () => {
    navigate("/admin");
  };

  //TEST SCROLL

  let prevScrollpos = window.pageYOffset;
  const navbar = document.querySelector(".nav-bar");
  const distanceToHideNavbar = 0; // adjust as necessary
  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (
      prevScrollpos > currentScrollPos &&
      prevScrollpos - currentScrollPos > distanceToHideNavbar
    ) {
      navbar.style.bottom = "0";
      navbar.style.transition = "bottom 0.5s";
    } else {
      navbar.style.bottom = `-${navbar.offsetHeight}px`;
      navbar.style.transition = "bottom 0.5s";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <div className="nav-bar">
      <ul>
        <li>
          <img src={homeImage} onClick={handleHomePage} alt="" />
        </li>

        {!loggedIn && <li onClick={handleUserRegistration}>Register</li>}
        {loggedIn && (
          <li>
            <img
              src={createImage}
              id="create-button"
              onClick={handleUserCreation}
            />
          </li>
        )}

        {loggedIn && (
          <li>
            <div className="user-dropdown">
              <div onClick={handleUserProfile}>{user}</div>
              <div className="user-dropdown-content">
                <a onClick={handleUserProfile}>Profile</a>
                <a onClick={handleMyUserPosts}>My Posts</a>
                {isAdmin && <a onClick={handleAdminPanel}>Admin Panel</a>}
                <a onClick={handleUserLogout}>Logout</a>
              </div>
            </div>
          </li>
        )}
        {!loggedIn && <li onClick={handleLogin}>Login</li>}
      </ul>
    </div>
  );
}
