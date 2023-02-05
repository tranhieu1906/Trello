import { Board } from "../models/Board";
import { User } from "../models/User";
import BoardService from "../services/board.service";
class BoardController {
  // Thêm bảng
  async createBoard(req, res, next) {
    try {
      const board = BoardService.createBoard(req, res);
      res.status(200).json({ board: board });
    } catch (err) {
      next(err);
    }
  }
  // lấy bảng theo id user
  async getUserBoard(req, res, next) {
    try {
      const boards = await BoardService.getUserBoard(req, res);
      res.status(200).json(boards);
    } catch (err) {
      next(err);
    }
  }
  // lấy bảng theo id bảng
  async getBoardId(req, res, next) {
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json("Board not found");
      }
      res.json(board);
    } catch (err) {
      next(err);
    }
  }
  // lấy bảng theo trạng thái
  async getBoardActivity(req, res, next) {
    try {
      const board = await Board.findById(req.params.boardId);
      if (!board) {
        return res.status(404).json("Board not found");
      }
      res.json(board.activity);
    } catch (err) {
      next(err);
    }
  }
  // Thay đổi tiêu đề bảng
  async renameBoard(req, res, next) {
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json("Board not found");
      }

      if (req.body.title !== board.title) {
        const user = await User.findById(req.user.id);
        board.activity.unshift({
          text: `${user.name} renamed this board (from '${board.title}')`,
        });
        board.title = req.body.title;
      }
      await board.save();

      res.json(board);
    } catch (err) {
      next(err);
    }
  }
  // Thêm thành viên vào bảng
  async addMember(req, res, next) {
    try {
      const board = await Board.findById(req.header("boardId"));
      if (!board) {
        return res.status(404).json("board not found");
      }
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).json("User not found");
      }
      if (board.members.some((m) => m.user.toString() === user.id)) {
        return res.status(400).json("Already member of board");
      }

      user.boards.unshift(board.id);
      await user.save();

      board.members.push({
        user: user.id,
        name: user.name,
        role: "observer",
      });

      board.activity.unshift({
        text: `${user.name} joined this board`,
      });

      await board.save();
      res.json(board.members);
    } catch (err) {
      next(err);
    }
  }
}
export default new BoardController();
