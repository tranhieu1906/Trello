import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../../services/auth/authActions";
import { userLogin } from "../../../services/auth/authActions";
import { getUser } from "../../../services/user/userService";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8000");
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  socket,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
      state.socket = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    setAvatar: (state, { payload }) => {
      state.userInfo.avatar = payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    loginSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [getUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { logout, socketIo, setAvatar, clearError, loginSuccess } =
  authSlice.actions;

export default authSlice.reducer;
