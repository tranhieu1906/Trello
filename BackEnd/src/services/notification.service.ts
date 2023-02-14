import { Notification } from "../models/Notification";
import { Board } from "../models/Board";

class NotificationService {
  //tạo thông báo mới
  async addNotification(req) {
    let usersId = req.body.usersId;
    console.log(req.user);
    for (let i = 0; i < usersId.length; i++) {
      let newNotification = {
        sender: req.user.id,
        receiver: usersId[i],
        content: req.body.content,
        attachBoard: req.body.board._id,
      };
      await Notification.create(newNotification);
    }
  }
  async getNotification(req) {
    let notificationList = await Notification.find({
      receiver: req.user.id,
    })
      .populate("attachBoard")
      .populate("sender");
    if (notificationList) {
      return notificationList;
    }
  }

  async getNewNotification(req) {
    let newNotification = await Notification.find({
      receiver: req.user.id,
      new: true,
    })
      .populate("attachBoard")
      .populate("sender");
    if (newNotification) {
      return newNotification;
    }
  }
}

export default new NotificationService();
