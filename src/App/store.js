import { configureStore } from "@reduxjs/toolkit";
import deleteArticleSlice from "../Features/deleteArticleSlice";
import loginSlice from "../Features/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    deleteArticle: deleteArticleSlice.reducer,
  },
});
