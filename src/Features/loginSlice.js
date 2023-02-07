import { createSlice } from "@reduxjs/toolkit";

let initialState = { loggedIn: false };

if (localStorage.getItem("USER")) initialState = { loggedIn: true };

console.log(initialState);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state) {
      console.log(state);
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
