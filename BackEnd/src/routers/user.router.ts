import  UserController  from "../controllers/user.controller"
import { Router } from 'express';
const userRoutes = Router();

userRoutes.get("/", UserController.getUser);
userRoutes.get("/:input", UserController.getUserEmail);

export default userRoutes;
