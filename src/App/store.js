import { configureStore } from "@reduxjs/toolkit";
import deleteArticleSlice from "../Features/deleteArticleSlice";
import loginSlice from "../Features/loginSlice";
import createRouteSlice from "../Features/routeCreation";

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    deleteArticle: deleteArticleSlice.reducer,
    createRoute: createRouteSlice.reducer,
  },
});
