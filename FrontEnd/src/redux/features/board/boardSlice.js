import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
  board: null,
  dashboardLoading: true,
  error: {},
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default boardSlice.reducer;
