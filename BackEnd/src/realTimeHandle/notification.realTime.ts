module.exports = async (io, socket) => {
  const newNotifications = (members) => {
    socket.to(members).emit("new-notifications", "new-notifications");
  };

  socket.on("send-notifications", newNotifications);
};
