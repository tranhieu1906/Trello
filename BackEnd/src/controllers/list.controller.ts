import ListService from '../services/list.service'
import CommentService from "../services/comment.service";
class ListController {
    async getlist(req, res) {
        try {
            const list = await ListService.getDataList(req, res);
            res.status(200).json(list);
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async addList(req, res) {
        try {
            const list = await ListService.addDataList(req);
            console.log(list)
            res.status(201).json({list:list});
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async deleteList(req, res) {
        try {

            let listdelete = await ListService.getDataList(req, res);

            if (!listdelete) {
                res.status(404).json({ message: "the list doesn't exist" })
            } else {
                  await ListService.deleteDataList(req, res);
                res.status(200).json({
                    success: true,
                });
            }
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async updateList(req, res) {
        try {
            let listUpdate = await ListService.editList(req, res);
            res.status(200).json({listUpdate});
        }
        catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

}
export default new ListController();