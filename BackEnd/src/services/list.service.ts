import {List} from '../models/List'

class ListService {
    async getDataList(req, res) {
        let {listId} = req.body;
        let list = await List.find({_id: listId});
        return list;
    }

    async addDataList(req) {


        let newList = new List({
            title: req.body.title,
            cards: []
        })

        await newList.save()
        return newList;
    }

    async deleteDataList(req, res) {
        console.log(2)
        let {listId} = req.params;
         let listDelete = await List.findOneAndDelete({_id: listId})
        console.log(3)

    }

    async editList(req, res) {
        let {listId} = req.body;
        let listEdit = await List.findOneAndUpdate(
            {_id: listId},
            {title: req.body.title},
            {new: true}
        )
        console.log(listEdit)
        return listEdit
    }
}

export default new ListService();