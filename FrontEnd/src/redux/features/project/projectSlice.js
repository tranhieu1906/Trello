import { createSlice } from "@reduxjs/toolkit";
import { getListProject } from "../../../services/project/projectService";

const initialState = {
  listProject: [],
  Project: null,
  loading: true,
  error: {},
};

const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
});
