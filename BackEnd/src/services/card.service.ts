import { Card } from "../models/Card"

class CardService {

    async addCard(req) {
        let idMembers = req.body.members
        let listMembers = []
        for (let i = 0; i < idMembers.length; i++) {
            let member = {
                user: idMembers[i]
            }
            listMembers.push(member)
        }
        console.log(req.body)
        let newCard = new Card({
            title: req.body.title,
            description: req.body.description,
            members: listMembers,
            label: req.body.label,
        })

        await newCard.save()
        return newCard
    };

    async cardUpdate(req) {
        let idMembers = req.body.members
        let listMembers = []
        for (let i = 0; i < idMembers.length; i++) {
            let member = {
                user: idMembers[i]
            }
            listMembers.push(member)
        }
        let cardUpdate =  await Card.findOneAndUpdate(
            {_id: req.params.id},
            {title: req.body.title,
                description: req.body.description,
                label: req.body.label,
                members:listMembers
            },
            { new: true }
        )
        if (cardUpdate) {
            return cardUpdate
        }
    }

    async cardDelete(req) {
        await Card.findOneAndDelete({ _id: req.params.id})
    }

    async getOneCard(req) {
        let id = req.params.id;
        let card = await Card.findOne({ _id: id });
        if (card) {
            return card
        }
    }

    async getCardByList() {
        let listCard = await Card.find()
        if (listCard) {
            return listCard
        }
    }
}


export default new CardService()