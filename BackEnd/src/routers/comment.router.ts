import CommentController from "../controllers/comment.controller";

import { Router } from 'express';
const commentRoutes = Router();

commentRoutes.get("/:idCard", CommentController.getComments);
commentRoutes.post("/:idCard", CommentController.addComment);
commentRoutes.delete("/:idComment", CommentController.deleteComment);
commentRoutes.put("/:idComment", CommentController.updateComment)

export default commentRoutes;
