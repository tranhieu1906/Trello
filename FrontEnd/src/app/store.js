import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/registerSlice";

export const store = configureStore({
  reducer: {
    authSlice: authReducer,
  },
});
