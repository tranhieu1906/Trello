import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import boardReducer from "./features/board/boardSlice";
import { authApi } from "../services/auth/authService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    board: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
