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
export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/boards/${id}`);
      if (data) {
        axios.defaults.headers.common["boardId"] = id;
      } else {
        delete axios.defaults.headers.common["boardId"];
      }
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
export const addMember = createAsyncThunk(
  "board/addMember",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/boards/member", userId);
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
export const removeMember = createAsyncThunk(
  "board/removeMember",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/boards/member/${userId}`);
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
export const changeRole = createAsyncThunk(
  "board/changeRole",
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
export const addList = createAsyncThunk(
  "board/addList",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/lists", formData);
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
export const getList = createAsyncThunk(
  "board/getList",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/lists/${id}`);
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
export const addCard = createAsyncThunk(
  "board/addCard",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/card/create", formData);
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
export const getCard = createAsyncThunk(
  "board/getCard",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/card/list/${id}`);
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

export const deleteBoard = async (boardId) => {
  try {
    let dataRes = await axios
      .delete(`/boards/delete/${boardId}`)
      .catch((error) => {
        console.log(error);
      });
    return dataRes.data.boards;
  } catch (error) {
    return error;
  }
};

export const getBoardData = async () => {
  try {
    let data = await axios.get("/boards").catch((error) => {
      console.log(error);
    });
    return data.data;
  } catch (error) {
    return error;
  }
};
