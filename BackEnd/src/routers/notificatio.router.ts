import NotificationController from "../controllers/notification.controller";
import { Router } from "express";

const notificationRouter = Router();

notificationRouter.get("/get", NotificationController.getNotifications);
notificationRouter.post("/add", NotificationController.addNotification);
notificationRouter.put("/read", NotificationController.readNotifications);

export default notificationRouter;
