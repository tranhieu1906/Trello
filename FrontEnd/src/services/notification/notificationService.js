import axios from "../../api/axios";

export const notificationAddMember = (users, board, user) => {
  let data = {
    usersId: users,
    content: `${user.name} đã thêm bạn vào bảng: `,
    board: board,
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
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
