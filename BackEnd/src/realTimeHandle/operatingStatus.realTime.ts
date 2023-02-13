module.exports = (io, socket) => {
  const setupConnect = (dataUser) => {
    socket.id = dataUser._id;
    socket.user = {
      id: dataUser._id,
      name: dataUser.name,
      email: dataUser.email,
    };
    console.log(`userId: ${socket.id} connected`);
  };

  const setupDisconnect = () => {
    console.log(`userId: ${socket.id} disconnect`);
  };

  socket.on("setup", setupConnect);
  socket.on("disconnect", setupDisconnect);
};
