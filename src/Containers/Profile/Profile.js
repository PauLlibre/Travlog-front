import React, { useEffect, useState } from "react";
import UserService from "../../Services/Travlog/UserService";
import { deleted } from "../../Features/deleteArticleSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const user_id = localStorage.getItem("USER");
  const [user, setUser] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newEmail, setNewEmail] = useState(user.email);

  useEffect(() => {
    getUserById();
  }, [editProfile]);
  const getUserById = async () => {
    const result = await UserService.getUserById(user_id);
    setUser(result);
  };

  const handleNewPassword = (ev) => {
    setNewPassword(ev.target.value);
  };

  const handleNewName = (ev) => {
    setNewName(ev.target.value);
  };

  const handleNewEmail = (ev) => {
    setNewEmail(ev.target.value);
  };

  const handleSaveChanges = async () => {
    const details = {
      name: newName,
      email: newEmail,
      password: newPassword,
    };
    const res = await UserService.modifyUser(user_id, details);
    setEditProfile(false);
    dispatch(deleted());
  };
  return (
    <div>
      <button onClick={() => setEditProfile(!editProfile)}>EDIT PROFILE</button>
      {editProfile ? <button onClick={handleSaveChanges}>SAVE</button> : <></>}
      {editProfile ? (
        <div>
          Name:<input value={newName} onChange={handleNewName}></input>
        </div>
      ) : (
        <div>{user.name}</div>
      )}
      {editProfile ? (
        <div>
          Email:<input value={newEmail} onChange={handleNewEmail}></input>
        </div>
      ) : (
        <div>{user.email}</div>
      )}
      <button onClick={() => setChangePassword(!changePassword)}>
        CHANGE PASSWORD
      </button>
      {changePassword ? (
        <div>
          <input
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
          ></input>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
