import { toast } from "react-toastify";
import axios from "axios";

export const login = async (data) => {
  try {
    return await axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "/auth/login",
      data: { email: data.email, password: data.password },
    });
  } catch (e) {
    return toast.error(e.response.data.message);
  }
};

