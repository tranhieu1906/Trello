import AuthController from "../controllers/auth.controller";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.register);

export default authRoutes;
