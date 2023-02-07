import BackgroundController from "../controllers/Background.controller";
import { Router } from "express";
import backgroundController from "../controllers/Background.controller";

const backgroundRoutes = Router();
backgroundRoutes.get("/", backgroundController.getBackground)
backgroundRoutes.post("/", backgroundController.addBackground)
export default backgroundRoutes;