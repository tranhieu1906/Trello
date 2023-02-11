import { createSlice } from "@reduxjs/toolkit";
import {
  addCard,
  addList,
  addMember,
  changeRole,
  getBoard,
  getBoards,
  getList,
  removeMember,
  moveList,
  moveCard
} from "../../../services/board/boardAction";

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
      state.loading = true;
    },
    [getBoard.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, ...payload };
      state.loading = false;
    },
    [getBoard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addMember
    [addMember.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, members: payload };
      state.loading = false;
    },
    [addMember.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // removeMember
    [removeMember.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, members: payload };
      state.loading = false;
    },
    [removeMember.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // changeRole
    [changeRole.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, members: payload };
      state.loading = false;
    },
    [changeRole.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addList
    [addList.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: payload,
      };
    },
    [addList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // addCard
    [addCard.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) =>
          list._id === payload._id ? payload : list
        ),
      };
    },
    [addCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },

    // getList
    [getList.pending]: (state) => {
      state.loading = true;
    },
    [getList.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) =>
          list._id === payload._id ? payload : list
        ),
      };
      state.loading = false;
    },
    [getList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // moveList
    [moveList.pending]: (state) => {
      state.loading = true;
    },
    [moveList.fulfilled]: (state, { payload }) => {
      state.board = { ...state.board, lists: payload };
      state.loading = false;
    },
    [moveList.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    // moveCard
    [moveCard.pending]: (state) => {
      state.loading = true;
    },
    [moveCard.fulfilled]: (state, { payload }) => {
      state.board = {
        ...state.board,
        lists: state.board.lists.map((list) =>
          list._id === payload.from._id
            ? payload.from
            : list._id === payload.to._id
            ? payload.to
            : list
        ),
      };
      state.loading = false;
    },
    [moveCard.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export default boardSlice.reducer;
