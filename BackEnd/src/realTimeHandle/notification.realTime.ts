import BoardService from "../services/board.service";

module.exports = async (io, socket) => {
  const newNotifications = (members) => {
    io.to(members).emit("new-notifications");
  };

  socket.on("send-notifications", newNotifications);
};
