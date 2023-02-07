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

    return boards;
  }

  async createGroupBoard(req) {
    let {title, backgroundURL } = req.body;
    let dataUser = {
      user: req.user.id,
      role: "admin"
    };
    let newBoard = new Board({
      title: title,
      backgroundURL: backgroundURL,
      classify: "group",
    });
    newBoard.members.push(dataUser);
    let dataBoardNew = await newBoard.save();
    let user = await User.findById(req.user.id);
    user.boards.unshift(dataBoardNew._id);
    return dataBoardNew;
  }

  async renameBoard(req, res) {}

}
export default new BoardService();
