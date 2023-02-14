import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/users");

      console.log("🚀 ~ file: userService.js:9 ~ data", data);

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

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/boards/member/${userId}`, { role });
      return data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// export const password = (value) => {
//     axios.put("/users/password",value)
//         .then()
// }
