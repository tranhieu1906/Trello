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

export const addUser = (userIds, project) => {
  let data = {
    userIds: userIds,
    projectId: project._id,
  };
  return axios.post("/project/members/add", data);
};
