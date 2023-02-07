import { createSlice } from "@reduxjs/toolkit";
import { getBoards } from "../../../services/board/boardAction";
import { getBoard } from "../../../services/board/boardAction";
import { addMember } from "../../../services/board/boardAction";

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

    [getBoard.pending]: (state) => {
      state.board = null;
    },
    [getBoard.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, ...payload };
    },
    [getBoard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addMember
    [addMember.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, members: payload };
    },
    [addMember.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default boardSlice.reducer;
