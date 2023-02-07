import CardController from "../controllers/card.controller";

import { Router } from "express";
const cardRoutes = Router();

cardRoutes.post("/create", CardController.addCard);
cardRoutes.put("/:id/update", CardController.cardUpdate);
cardRoutes.delete("/:id/delete", CardController.cardDelete);
cardRoutes.get("/:id/data", CardController.getOneCard)
cardRoutes.get("/list", CardController.getCards)
export default cardRoutes;