import CardService from "../services/card.service";

class CardController {
  async addCard(req, res, next) {
    try {
      const newCard = await CardService.addCard(req);
      res.status(200).json(newCard);
    } catch (error) {
      next(error);
    }
  }

  async cardUpdate(req, res, next) {
    try {
      const dataCardUpdate = await CardService.cardUpdate(req);
      res.status(200).json({
        success: true,
        dataCard: dataCardUpdate,
      });
    } catch (error) {
      next(error);
    }
  }

  async cardDelete(req, res, next) {
    try {
      await CardService.cardDelete(req,res);
      res.status(200).json(req.params.id);
    } catch (error) {
      next(error);
    }
  }

  async getOneCard(req, res, next) {
    try {
      let dataCard = await CardService.getOneCard(req);
      res.status(200).json({
        success: true,
        dataCard: dataCard,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCards(req, res, next) {
    try {
      let card = await CardService.getCardByList(req);
      if (!card) {
        return res.status(404).json("Thẻ không tìm thấy");
      }
      res.status(200).json({
        card,
      });
    } catch (error) {
      next(error);
    }
  }
  async moveCards(req, res, next) {
    try {
      let card = await CardService.moveCard(req, res);
      res.json(card);
    } catch (error) {
      next(error);
    }
  }
  async addCardMember(req, res, next) {
    try {
      let card = await CardService.addCardMember(req, res);
      res.json(card);
    } catch (error) {
      next(error);
    }
  }
  async editCard(req, res, next) {
    try {
      let card = await CardService.editCard(req, res);
      res.json(card);
    } catch (error) {
      next(error);
    }
  }
  async archiveCard(req, res, next) {
    try {
      let card = await CardService.archiveCard(req, res);
      res.json(card);
    } catch (error) {
      next(error);
    }
  }
}
export default new CardController();
