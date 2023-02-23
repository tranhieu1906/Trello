import { createSlice } from "@reduxjs/toolkit";
import { getListProject } from "../../../services/project/projectService";

const initialState = {
  idProject: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    getProject: (state, action) => {
      const id = action.payload;
      state.idProject = id;
    },
  },
});
export const { getProject } = projectSlice.actions;
export default projectSlice.reducer;
