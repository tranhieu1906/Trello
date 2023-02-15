import { Comment } from "../models/Comment";

class CommentService {
  async getDataComments(req) {
    let id = req.params.idCard;
    let comments = await Comment.find({ card: id }).populate("user");
    if (comments) {
      return comments;
    }
  }

  async getDataComment(req) {
    let id = req.params.idComment;
    let comment = await Comment.findOne({ _id: id });
    if (comment) {
      return comment;
    }
  }

  async addDataComment(req) {
    let comment = new Comment({
      content: req.body.comment,
      user: req.user.id,
      card: req.params.idCard,
    });
    let commentNew = await comment.save();
    if (commentNew) {
      return commentNew;
    }
  }

  async deleteDataComment(req) {
    let id = req.params.idComment;
    await Comment.findOneAndDelete({ _id: id });
  }

  async editComment(req) {
    let id = req.params.idComment;
    let newComment = await Comment.findOneAndUpdate(
      { _id: id },
      { title: req.body.title },
      { new: true }
    );
    if (newComment) {
      return newComment;
    }
  }
}

export default new CommentService();
