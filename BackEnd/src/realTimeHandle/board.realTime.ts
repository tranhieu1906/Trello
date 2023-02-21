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
    socket.to(roomCard).emit("comment-new");
  };

  const dragAndDrop = () => {};

  const joinBoard = (board) => {};

  // socket.on("drag-and-drop");
  socket.on("board-drop", boardDrop);
  socket.on("join-card", joinCard);
  socket.on("send-comment", sendComment);
  socket.on("join-board", joinBoard);
};
