import { List } from "../models/List";
import { Board } from "../models/Board";
import { User } from "../models/User";

class ListService {
  async getDataList(req, res) {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }
    return list;
  }

  async addDataList(req) {
    const title = req.body.title;
    const boardId = req.header("boardId");
    const newList = new List({ title });
    const list = await newList.save();
    const board = await Board.findById(boardId).populate("lists");
    board.lists.push(list);
    const user = await User.findById(req.user.id);
    board.activity.unshift({
      text: `${user.name} added '${title}' to this board`,
    });
    await board.save();

    return board.lists
  }

  async deleteDataList(req, res) {
    let { listId } = req.params;
    let listDelete = await List.findOneAndDelete({ _id: listId });
  }

  async editList(req, res) {
    let { listId } = req.body;
    let listEdit = await List.findOneAndUpdate(
      { _id: listId },
      { title: req.body.title },
      { new: true }
    );
    console.log(listEdit);
    return listEdit;
  }
}

export default new ListService();
