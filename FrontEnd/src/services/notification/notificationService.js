import axios from "../../api/axios";

export const notificationAddMember = (users, board, user) => {
  let data = {
    usersId: users,
    content: `Người dùng ${user.name} đã thêm bạn vào bảng: ${board.title}`,
  };
  console.log(data);
  axios
    .post("/notification/add", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.message;
    });
};

export const getNotification = () => {
  axios
    .get("/notification/get")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
