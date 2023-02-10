import UserController from "../controllers/user.controller";
import { Router } from "express";
const userRoutes = Router();

userRoutes.get("/", UserController.getUser);
userRoutes.get("/:input", UserController.getUserEmail);
userRoutes.put("/password", UserController.editPassword);

export default userRoutes;
