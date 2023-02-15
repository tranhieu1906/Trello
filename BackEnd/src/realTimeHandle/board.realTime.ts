import BoardService from "../services/board.service";

module.exports = async (io, socket) => {
  const boardDrop = async (data) => {
    let members = await BoardService.userInBoard(data);
    socket.to(members).emit("update-board-list", "update");
  };
  socket.on("board-drop", boardDrop);
};
