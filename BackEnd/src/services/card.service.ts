import { Card } from "../models/Card"

class CardService {

    async addCard(req, res) {
        let newCard = {
            title: req.body.title,
            description: req.body.description,
            label: req.body.label,
            members: req.body.members,

        }
    }
}