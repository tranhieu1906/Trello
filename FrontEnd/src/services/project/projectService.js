import axios from "../../api/axios";

export const createProject = async (values) => {
  await axios.post("/project/create", values).catch((err) => {
    console.log(err.message);
  });
};
