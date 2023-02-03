import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("auth/register", async (data) => {
  const response = await axios({
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    url: "/auth/register",
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
  return response.data;
});

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        localStorage.removeItem("token");
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { userLoaded, logout } = authSlice.actions;

export default authSlice.reducer;
