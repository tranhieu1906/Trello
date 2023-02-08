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
  async getUserBoard(req) {
    const user = await User.findById(req.user.id);
    let boards = [];
    for (let i = 0; i < user.boards.length; i++) {
      let board = await Board.findById(user.boards[i]);
      if (board.softErase === false) {
        boards.push(board)
      }
    }
    return boards;
  }

  async newBoard(req) {
    let {title, backgroundURL, classify } = req.body;
    let user = await User.findById(req.user.id);
    let dataUser = {
      user: req.user.id,
      role: "admin"
    };
    let activity = {
      text: `${user.name} created this board`,
    }
    let newBoard = new Board({
      title: title,
      backgroundURL: backgroundURL,
      classify: classify,
    });
    newBoard.activity.unshift(activity);
    newBoard.members.push(dataUser);
    let dataBoardNew = await newBoard.save();
    user.boards.unshift(dataBoardNew._id);
    await user.save();
    return dataBoardNew;
  }

  async deleteBoard(req) {
    await Board.findOneAndUpdate(
        {_id: req.params.boardId},
        {softErase: true},
        { new: true }
    )
  }

    async getBoardById(req) {
      let dataBoard = await Board.findOne({id: req.params.boardId});
      if (dataBoard) {
        return dataBoard
      }
    };


  async renameBoard(req, res) {}
}
export default new BoardService();
