import CardService from "../services/card.service";

class CardController {
    async addCard(req, res) {
        try {
            const newCard = await CardService.addCard(req);
            console.log(newCard)
            res.status(201).json({
                success: true,
                newCard: newCard
            })
        }catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async cardUpdate(req, res) {
        try {
            const dataCardUpdate = await CardService.cardUpdate(req);
            res.status(200).json({
                success: true,
                dataCard: dataCardUpdate
            });
        }catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async cardDelete(req, res) {
        try {
            await CardService.cardDelete(req)
            res.status(200).json({
                success: true
            })
        }catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async getOneCard(req, res) {
        try {
            let dataCard =  await CardService.getOneCard(req)
            res.status(200).json({
                success: true,
                dataCard: dataCard
            })
        }catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    async getCards(req, res) {
        try {
            let listCard = await CardService.getCardByList();
            res.status(200).json({
                success: true,
                listCard: listCard
            })
        }catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

}
export default new CardController()