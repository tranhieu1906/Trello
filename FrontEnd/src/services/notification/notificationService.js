import axios from "../../api/axios";

export const notificationAddMember = (users, board, user) => {
  let data = {
    usersId: users,
    content: `${user.name} đã thêm bạn vào bảng: `,
    attachBoard: board,
  };
  axios
    .post("/notification/add", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const notificationJoinProject = (users, project, user) => {
  let data = {
    usersId: users,
    content: `${user.name} đã thêm bạn vào không gian làm việc: `,
    attachBoard: project,
  };
  axios
    .post("/notification/add", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // return err.message;
      console.log(err.message);
    });
};

export const getNotification = () => {
  let data = axios.get("/notification/get");
  return data;
};

export const readNotification = async () => {
  let dataRes = await axios.put("/notification/read");
  if (dataRes) {
    return dataRes;
  }
};
