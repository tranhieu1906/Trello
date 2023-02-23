import UserController from "../controllers/user.controller";
import { Router } from "express";
const userRoutes = Router();

userRoutes.get("/", UserController.getUser);
userRoutes.get("/:input", UserController.getUserEmail);
userRoutes.get("/board/:input", UserController.getUserEmailInBoard);
userRoutes.put("/password", UserController.editPassword);
userRoutes.put("/update-profile", UserController.updateProfile);
userRoutes.post("/update", UserController.updateAvatar);

export default userRoutes;
