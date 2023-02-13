import NotificationController from "../controllers/notification.controller";
import { Router } from "express";

const notificationRouter = Router();

notificationRouter.get("/list", NotificationController.getNotification);
notificationRouter.post("/add", NotificationController.addNotification);

export default notificationRouter;
