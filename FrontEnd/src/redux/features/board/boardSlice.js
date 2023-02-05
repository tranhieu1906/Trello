import { createSlice } from "@reduxjs/toolkit";
import { getBoards } from "../../../services/board/boardAction";

const initialState = {
  boards: [],
  board: null,
  loading: true,
  error: {},
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: {
    [getBoards.pending]: (state) => {
      state.board = null;
    },
    [getBoards.fulfilled]: (state, { payload }) => {
      state.boards = payload;
      state.loading = false;
    },
    [getBoards.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default boardSlice.reducer;
