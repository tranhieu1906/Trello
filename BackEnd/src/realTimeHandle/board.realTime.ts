import BoardService from "../services/board.service";

module.exports = async (io, socket) => {
  const boardDrop = async (data) => {
    let members = await BoardService.userInBoard(data);
    socket.to(members).emit("update-board-list", "update");
  };

  const joinCard = (cardId) => {
    socket.join(cardId);
  };

  const sendComment = (dataComment) => {
    let roomCard = dataComment.card;
    socket.to(roomCard).emit("comment-new", dataComment);
  };

  socket.on("board-drop", boardDrop);
  socket.on("join-card", joinCard);
  socket.on("send-comment", sendComment);
};
