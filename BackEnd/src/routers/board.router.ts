import { Router } from "express";
import BoardController from "../controllers/board.controller"
const boardRoutes = Router();


boardRoutes.get("/", BoardController.getUserBoard);
boardRoutes.post("/", BoardController.createBoard);
boardRoutes.get("/:id", BoardController.getBoardId);
boardRoutes.get("/activity/:boardId", BoardController.getBoardActivity);
boardRoutes.put("/rename/:id", BoardController.renameBoard);
boardRoutes.put("/addMember/:userId", BoardController.addMember);
boardRoutes.post("/group/create", BoardController.createGroupBoard);

export default boardRoutes;
