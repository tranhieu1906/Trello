import CardService from "../services/card.service";

class CardController {
  async addCard(req, res) {
    try {
      const newCard = await CardService.addCard(req);
      res.status(200).json(newCard);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async cardUpdate(req, res) {
    try {
      const dataCardUpdate = await CardService.cardUpdate(req);
      res.status(200).json({
        success: true,
        dataCard: dataCardUpdate,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async cardDelete(req, res) {
    try {
      await CardService.cardDelete(req);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getOneCard(req, res) {
    try {
      let dataCard = await CardService.getOneCard(req);
      res.status(200).json({
        success: true,
        dataCard: dataCard,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getCards(req, res) {
    try {
      let card = await CardService.getCardByList(req);
      if (!card) {
        return res.status(404).json({ msg: "Thẻ không tìm thấy" });
      }
      res.status(200).json({
        card,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
export default new CardController();
