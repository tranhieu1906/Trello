import axios from "../../api/axios";

export const createProject = (values) => {
  return axios.post("/project/create", values);
};

export const getListProject = () => {
  return axios.get("/project/list");
};

export const getDataProject = (params) => {
  return axios.get(`/project/${params.id}`);
};
