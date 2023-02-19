import { Board } from "../models/Board";
import { User } from "../models/User";
import { Project } from "../models/Project";
import UserService from "./user.service";
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
      text: `${user.name} đã tạo bảng này`,
    });
    await board.save();
    return board;
  }
  // async getUserBoard(req) {
  //   const user = await User.findById(req.user.id);
  //   let boards = [];
  //   for (let i = 0; i < user.boards.length; i++) {
  //     let board = await Board.findById(user.boards[i]);
  //     if (board.softErase === false) {
  //       boards.push(board);
  //     }
  //   }
  //   return boards;
  // }

  async getUserBoard(req) {
    const user = await UserService.getDataUser(req);
    let boards = user.boards;
    if (boards) return boards;
  }

  async newBoard(req) {
    let { title, backgroundURL, classify, project } = req.body;
    let user = await User.findById(req.user.id);
    let dataUser = {
      user: req.user.id,
      role: "admin",
    };
    let activity = {
      text: `${user.name} đã tạo bảng này `,
    };
    let newBoard = new Board({
      title: title,
      backgroundURL: backgroundURL,
      classify: classify,
      project: project,
      owner: req.user.id,
    });
    newBoard.activity.unshift(activity);
    newBoard.members.push(dataUser);
    let dataBoardNew = await newBoard.save();
    user.boards.unshift(dataBoardNew._id);
    const updateProject = await Project.findById(project);
    updateProject.boards.push(newBoard);
    await updateProject.save();
    await user.save();
  }

  async deleteBoard(req) {
    await Board.findOneAndDelete({ _id: req.params.boardId });
  }

  async getBoardById(id) {
    const board = await Board.findById(id).populate([
      { path: "members.user" },
      {
        path: "lists",
        populate: {
          path: "cards",
          populate: {
            path: "members.user",
          },
        },
      },
    ]);

    if (board) {
      return board;
    }
  }

  async renameBoard(req, res, board) {
    let title = Object.keys(req.body)[0];
    if (title !== board.title) {
      const user = await User.findById(req.user.id);
      board.activity.unshift({
        text: `${user.name} thay đổi tên bảng này (từ '${board.title}')`,
      });
      board.title = title;
    }
    await board.save();
  }

  async addMember(users, board) {
    users.map((user) => {
      user.boards.unshift(board.id);
      board.members.push({ user: user, role: "observer" });
      board.activity.unshift({
        text: `${user.name} đã tham gia bảng này`,
      });
    });

    await Promise.all(users.map((user) => user.save()));
    await board.save();
  }

  async removeMember(req, res, board) {
    const memberIndex = board.members.findIndex(({ user: { _id } }) =>
      _id.equals(req.params.userId)
    );

    if (memberIndex === -1)
      return res.status(404).json("Người dùng không tồn tại");

    const member = board.members[memberIndex];
    board.members.splice(memberIndex, 1);
    member.user.boards = member.user.boards.filter(
      (boardId) => !boardId.equals(board._id)
    );
    board.activity.unshift({
      text: `${member.user.name} đã rời khỏi bảng này`,
    });

    await Promise.all([member.user.save(), board.save()]);
    res.json(board.members);
  }

  async changeRole(req, res, board) {
    const memberIndex = board.members.findIndex(({ user: { _id } }) =>
      _id.equals(req.params.userId)
    );
    if (memberIndex === -1) return res.status(404).json("Member not found");

    const member = board.members[memberIndex];
    if (req.body.role === member.role)
      return res.status(409).json("Role already set");

    member.role = req.body.role;
    board.activity.unshift({
      text: `${member.user.name}'s role đã được thay đổi thành ${req.body.role}`,
    });

    await board.save();
    res.json(board.members);
  }

  async userInBoard(data) {
    try {
      let userIdList = [];
      let { members } = await Board.findById(data.boardId);
      for (let i = 0; i < members.length; i++) {
        if (members[i].user.toString() !== data.userId) {
          userIdList.push(members[i].user.toString());
        }
      }
      return userIdList;
    } catch (error) {
      return [];
    }
  }
}
export default new BoardService();
