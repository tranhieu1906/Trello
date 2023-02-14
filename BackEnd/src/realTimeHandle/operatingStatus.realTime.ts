module.exports = (io, socket) => {
  const setupConnect = (dataUser) => {
    socket.user = {
      id: dataUser._id,
      name: dataUser.name,
      email: dataUser.email,
    };
    socket.join(dataUser._id);
    console.log(`userId: ${socket.id} connected`);
  };

  const setupDisconnect = () => {
    console.log(`userId: ${socket.id} disconnect`);
  };

  socket.on("setup", setupConnect);
  socket.on("disconnect", setupDisconnect);
};
