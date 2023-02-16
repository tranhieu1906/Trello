import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/users");
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserLogin = createAsyncThunk(
  "user/getUserLogin",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/users");
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const editPassword = (value) => {};

// export const password = (value) => {
//     axios.put("/users/password",value)
//         .then()
// }
