import axios from "../../api/axios";

export const notificationAddMember = (users, board, user) => {
  let data = {
    usersId: users,
    content: `${user.name} đã thêm bạn vào bảng: `,
    board: board,
  };
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

export const readNotification = async () => {
  let dataRes = await axios.put("/notification/read");
  if (dataRes) {
    return dataRes;
  }
};
