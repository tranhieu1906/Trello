import ProjectController from "../controllers/project.controller";
import { Router } from "express";
import projectController from "../controllers/project.controller";
const projectRoutes = Router();
projectRoutes.post("/create", ProjectController.createProject);
projectRoutes.get("/list", projectController.getListProject);
export default projectRoutes;
