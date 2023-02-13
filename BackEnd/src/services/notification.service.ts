import { Notification } from "../models/Notification";
import { Board } from "../models/Board";

class NotificationService {
  //tạo thông báo mới
  async addNotification(req) {
    let usersId = req.body.usersId;
    for (let i = 0; i < usersId.length; i++) {
      let newNotification = {
        sender: req.user.id,
        receiver: usersId[i],
        content: req.body.content,
      };
      await Notification.create(newNotification);
    }
  }
  async getNotification(req) {
    let notificationList = await Notification.find({ receiver: req.user.id });
    if (notificationList) {
      return notificationList;
    }
  }
}

export default new NotificationService();
