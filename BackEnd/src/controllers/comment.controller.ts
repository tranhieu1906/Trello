import CommentService from "../services/comment.service";
class CommentController {
  async getComments(req, res) {
    try {
      const comments = await CommentService.getDataComments(req);
      console.log(comments);
      res.status(200).json({ comments: comments });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async addComment(req, res) {
    try {
      const comment = await CommentService.addDataComment(req);
      res.status(200).json({ commentNew: comment });
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async deleteComment(req, res) {
    try {
      let commentDelete = await CommentService.getDataComment(req);

      if (!commentDelete) {
        res.status(404).json({ message: "bình luận không tồn tại" });
      } else {
        await CommentService.deleteDataComment(req);
        res.status(204).json();
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async updateComment(req, res) {
    try {
      let newComment = await CommentService.editComment(req);
      res.status(200).json(newComment);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new CommentController();
