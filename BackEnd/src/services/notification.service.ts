import { Notification } from "../models/Notification";
import { Board } from "../models/Board";

class NotificationService {
  //tạo thông báo mới
  async addNotification(req) {
    const board = await Board.findById(req.header("boardId")).populate(
      "members"
    );
    console.log(board.members);
    // for () {}
    // let NewNotification = new Notification({
    //   sender: req.user._id,
    //   receiver: req.body.receiver,
    //   Content: req.body.content,
    // });
    // NewNotification = await NewNotification.save();
    // if (NewNotification) {
    //   return NewNotification;
    // }
  }

  async getNotification(req) {
    let notificationList = await Notification.find({ sender: req.user._id });
    if (notificationList) {
      return notificationList;
    }
  }
}

export default new NotificationService();
