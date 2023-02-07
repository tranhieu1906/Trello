import {List} from '../models/List'

class ListService {
    async getList(req, res) {
        let id = req.params.id1;
        let list = await List.find({ list: id }).populate("user", "name");
        return list;
    }

    async getDataList(req, res) {
        let id = req.params.id;
        let list = await List.findOne({ _id: id });
        return list;
    }

    async addDataList(req, res) {
        let list = new List({
            title: req.body.title,
            card: req.user.id,
        })
        await list.save()
    }

    async deleteDataList(req, res) {
        let id = req.params.id;
        await List.findOneAndDelete({ _id: id })
    }

    async editList(req, res) {
        let id = req.params.idComment;
        let newList = await List.findOneAndUpdate(
            { _id: id },
            { title: req.body.title },
            { new: true }
        )
        return newList
    }
}

export default new ListService();