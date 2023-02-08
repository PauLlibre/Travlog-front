import { createSlice } from "@reduxjs/toolkit";

let initialState = { loggedIn: false };

if (localStorage.getItem("USER")) initialState = { loggedIn: true };

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state) {
      return { ...state, loggedIn: true };
    },
    logout(state) {
      return { ...state, loggedIn: false };
    },
    default: (state) => {
      state = initialState;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice;
