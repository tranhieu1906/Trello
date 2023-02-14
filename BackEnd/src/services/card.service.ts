import { Card } from "../models/Card";
import { List } from "../models/List";
import { User } from "../models/User";
import { Board } from "../models/Board";

class CardService {
  async addCard(req) {
    const { title, listId } = req.body;
    const boardId = req.header("boardId");
    const user = await User.findById(req.user.id);
    const newCard = new Card({ title });
    const card = await newCard.save();
    const list = await List.findByIdAndUpdate(
      listId,
      { $push: { cards: card.id } },
      { new: true }
    ).populate({
      path: "cards",
      populate: {
        path: "members.user",
      },
    });
    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        $push: {
          activity: {
            text: `${user.name} đã thêm '${title}' đến '${list.title}'`,
          },
        },
      },
      { new: true }
    ).populate("lists");

    await board.save();
    return list;
  }

  async cardUpdate(req) {
    let idMembers = req.body.members;
    let listMembers = [];
    for (let i = 0; i < idMembers.length; i++) {
      let member = {
        user: idMembers[i],
      };
      listMembers.push(member);
    }
    let cardUpdate = await Card.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        label: req.body.label,
        members: listMembers,
      },
      { new: true }
    );
    if (cardUpdate) {
      return cardUpdate;
    }
  }

  async cardDelete(req) {
    await Card.findOneAndDelete({ _id: req.params.id });
  }

  async getOneCard(req) {
    let id = req.params.id;
    let card = await Card.findOne({ _id: id });
    if (card) {
      return card;
    }
  }

  async getCardByList(req) {
    const card = await Card.findById(req.params.id);
    return card;
  }
  async editCard(req, res) {
    const { title, description, label } = req.body;
    if (title === "") {
      return res.status(400).json("Title là bắt buộc");
    }
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json("Card không tồn tại");
    }
    card.title = title;
    if (description || description === "") {
      card.description = description;
    }
    if (label || label === "none") {
      card.label = label;
    }
    await card.save();
  }

  async moveCard(req, res) {
    const { fromId, toId, toIndex } = req.body;
    const boardId = req.header("boardId");

    const cardId = req.params.id;
    const from = await List.findById(fromId);
    let to = await List.findById(toId);
    if (!cardId || !from || !to) {
      return res.status(404).json("List/card không tồn tại");
    } else if (fromId === toId) {
      to = from;
    }

    const fromIndex = from.cards.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cards.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cards.includes(cardId)) {
      if (toIndex === 0 || toIndex) {
        to.cards.splice(toIndex, 0, cardId);
      } else {
        to.cards.push(cardId);
      }
      await to.save();
    }
    if (fromId !== toId) {
      const user = await User.findById(req.user.id);
      const board = await Board.findById(boardId);
      const card = await Card.findById(cardId);
      board.activity.unshift({
        text: `${user.name} di chuyển '${card.title}' từ '${from.title}' tới '${to.title}'`,
      });
      await board.save();
    }
    const fromList = await List.findById(fromId).populate({
      path: "cards",
      populate: {
        path: "members.user",
      },
    });
    let toList = await List.findById(toId).populate({
      path: "cards",
      populate: {
        path: "members.user",
      },
    });
    return { cardId, fromList, toList };
  }

  async addCardMember(req, res) {
    const { cardId, userId } = req.params;
    const card = await Card.findById(cardId).populate("members.user");
    const user = await User.findById(userId);
    if (!card || !user) {
      return res.status(404).json("Card/User không tồn tại");
    }
    const add = req.params.add === "true";
    if (add) {
      card.members.push({ user: user });
    } else {
      card.members = card.members.filter(
        (member) => member.user._id.toString() !== userId.toString()
      );
    }
    await card.save();

    const board = await Board.findById(req.header("boardId")).populate([
      { path: "activity", populate: { path: "user", select: "name" } },
    ]);
    board.activity.unshift({
      text: `${user.name} ${add ? "joined" : "left"} '${card.title}'`,
      user,
    });
    await board.save();

    return card;
  }
}

export default new CardService();
