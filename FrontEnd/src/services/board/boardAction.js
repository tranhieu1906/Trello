import axios from "../../api/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getBoards = createAsyncThunk(
  "board/getBoards",
  async (data, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/boards");
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
