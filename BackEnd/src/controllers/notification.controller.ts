import NotificationService from "../services/notification.service";
class NotificationController {
  async addNotification(req, res) {
    try {
      let newNotification = await NotificationService.addNotification(req);
      res.status(200).json({
        success: true,
        newNotification: newNotification,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getNotification(req, res) {
    try {
      let listNotification = await NotificationService.getNotification(req);
      res.status(200).json({
        success: true,
        notification: listNotification,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new NotificationController();
