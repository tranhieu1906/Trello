import { Notification } from "../models/Notification";
import { Board } from "../models/Board";
import BoardService from "./board.service";
import ProjectService from "./Project.service";
class NotificationService {
  //tạo thông báo mới
  async addNotification(req) {
    let usersId = req.body.usersId;
    let boarData = await BoardService.getBoardById(req.body.attachBoard._id);
    if (boarData) {
      let board = {
        title: boarData.title,
        backgroundURL: boarData.backgroundURL,
      };
      for (let i = 0; i < usersId.length; i++) {
        let newNotification = {
          sender: req.user.id,
          receiver: usersId[i],
          content: req.body.content,
          attachBoard: board,
        };
        await Notification.create(newNotification);
      }
    } else {
      let project = {
        title: req.body.attachBoard.name,
        backgroundURL:
          "https://png.pngtree.com/png-clipart/20190924/original/pngtree-notification--icon-in-trendy-style-isolated-background-png-image_4859213.jpg",
      };
      for (let i = 0; i < usersId.length; i++) {
        let newNotification = {
          sender: req.user.id,
          receiver: usersId[i],
          content: req.body.content,
          attachBoard: project,
        };
        let a = await Notification.create(newNotification);
      }
    }
  }
  async getNotification(req) {
    let notificationList = await Notification.find({
      receiver: req.user.id,
    })
      .sort({ createdAt: -1 })
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
      .sort({ createdAt: -1 })
      .populate("attachBoard")
      .populate("sender");
    if (newNotification) {
      return newNotification;
    }
  }

  async readNotifications(req) {
    let read = await Notification.updateMany(
      { new: true, receiver: req.user.id },
      {
        $set: { new: false },
      }
    );
    if (read) {
      return read;
    }
  }
}

export default new NotificationService();
