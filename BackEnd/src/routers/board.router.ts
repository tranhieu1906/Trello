import { Router } from "express";
import BoardController from "../controllers/board.controller";
const boardRoutes = Router();

boardRoutes.get("/", BoardController.getUserBoard);
boardRoutes.post("/", BoardController.newBoard);
boardRoutes.get("/:id", BoardController.getBoardId);
boardRoutes.get("/activity/:boardId", BoardController.getBoardActivity);
boardRoutes.put("/rename/:id", BoardController.renameBoard);
boardRoutes.delete("/member/:userId", BoardController.removeMember);
boardRoutes.put("/member/:userId", BoardController.changeRole);
boardRoutes.post("/member", BoardController.addMember);
boardRoutes.delete("/delete/:boardId", BoardController.boardDelete);
export default boardRoutes;
