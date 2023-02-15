import CardController from "../controllers/card.controller";

import { Router } from "express";
const cardRoutes = Router();

cardRoutes.post("/create", CardController.addCard);
cardRoutes.put("/:id/update", CardController.cardUpdate);
cardRoutes.delete("/:id/delete", CardController.cardDelete);
cardRoutes.get("/:id/data", CardController.getOneCard)
cardRoutes.get("/list/:id", CardController.getCards)
cardRoutes.patch("/move/:id", CardController.moveCards);
cardRoutes.put("/addMember/:add/:cardId/:userId", CardController.addCardMember);
cardRoutes.patch("/edit/:id", CardController.editCard);
cardRoutes.patch("/archive/:archive/:id", CardController.archiveCard);
export default cardRoutes;