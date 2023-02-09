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
    ).populate("cards");
    const board = await Board.findByIdAndUpdate(
      boardId,
      {
        $push: {
          activity: {
            text: `${user.name} added '${title}' to '${list.title}'`,
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
}

export default new CardService();
