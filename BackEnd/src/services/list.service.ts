import {List} from '../models/List'

class ListService {
    async getList(req, res) {
        let {listId} = req.body;
        let list = await List.find({_id:listId})
        return list;
    }

    async addDataList(req) {
        let newList = new List({
            title: req.body.title,
            archived: req.body.archived,
            cards: []
        })

        await newList.save()
    }

    async deleteDataList(req, res) {
        let id = req.params.id;
        await List.findOneAndDelete({ _id: id })
    }

    async editList(req, res) {
        let id = req.params.idList;
        let newList = await List.findOneAndUpdate(
            { _id: id },
            { title: req.body.title },
            { new: true }
        )
        return newList
    }
}

export default new ListService();