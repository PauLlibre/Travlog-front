import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

const createRouteSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    add(state, action) {
      return [...state, action.payload];
    },
    retrieve(state, action) {
      return state.filter((_, i) => i !== action.payload);
    },
    update(state, action) {
      const { index, description, time } = action.payload;
      state[index] = {
        ...state[index],
        description,
        time,
      };
      return state;
    },
  },
});

export const { add, retrieve, update } = createRouteSlice.actions;

export default createRouteSlice;
