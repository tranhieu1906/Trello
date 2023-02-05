import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import boardReducer from "./features/board/boardSlice";
import { authApi } from "../services/auth/authService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    board:boardReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
