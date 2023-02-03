import  UserController  from "../controllers/user.controller"
import { Router } from 'express';
const userRoutes = Router();

userRoutes.get("/", UserController.getUser);

export default userRoutes;
