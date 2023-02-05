import { Comment } from "../models/Comment";

class CommentService {
    async getDataComments(req, res) {
        let id = req.params.idCard;
        let comments = await Comment.find({ card: id }).populate("user", "name");
        return comments;
    }

    async getDataComment(req, res) {
        let id = req.params.idComment;
        let comment = await Comment.findOne({ _id: id });
        return comment;
    }

    async addDataComment(req, res) {
        let comment = new Comment({
            title: req.body.title,
            user: req.user.id,
            card: req.params.idCard
        })
        await comment.save()
    }

    async deleteDataComment(req, res) {
        let id = req.params.idComment;
        await Comment.findOneAndDelete({ _id: id })
    }

    async editComment(req, res) {
        let id = req.params.idComment;
        let newComment = await Comment.findOneAndUpdate(
            { _id: id },
            { title: req.body.title },
            { new: true }
        )
        return newComment
    }
}

export default new CommentService();