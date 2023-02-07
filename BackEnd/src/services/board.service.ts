import { Board } from "../models/Board";
import { User } from "../models/User";
class BoardService {
  async createBoard(req, res) {
    const { title, backgroundURL } = req.body;

    const newBoard = new Board({ title, backgroundURL });

    const [board, user] = await Promise.all([
      newBoard.save(),
      User.findById(req.user.id),
    ]);
    user.boards.unshift(board.id);
    await user.save();
    board.members.push({ user: user._id, name: user.name });
    board.activity.unshift({
      text: `${user.name} created this board`,
    });
    await board.save();
    return board;
  }
  async getUserBoard(req, res) {
    const user = await User.findById(req.user.id);
    const boards = await Promise.all(
      user.boards.map((boardId) => Board.findById(boardId))
    );
    console.log(boards);
    return boards;
  }
}
export default new BoardService();
