import axios from "../../api/axios";

export const getUser = async () => {
    return axios.get("/users")
}