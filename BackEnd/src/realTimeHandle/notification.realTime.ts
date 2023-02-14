import BoardService from "../services/board.service";

module.exports = async (io, socket) => {
  const newNotifications = (members) => {
    for (let i = 0; i < members.length; i++) {
      socket.to(`${members[i]}`).emit("new-notifications", "new-notifications");
    }
  };

  socket.on("send-notifications", newNotifications);
};
