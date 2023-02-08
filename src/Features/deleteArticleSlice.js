import { createSlice } from "@reduxjs/toolkit";

let initialState = { isDeleted: false };

const deleteArticleSlice = createSlice({
  name: "deleteArticle",
  initialState,
  reducers: {
    deleted(state) {
      return { ...state, isDeleted: !state.isDeleted };
    },
  },
});

export const { deleted } = deleteArticleSlice.actions;

export default deleteArticleSlice;
