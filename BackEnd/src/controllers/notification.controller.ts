import NotificationService from "../services/notification.service";
class NotificationController {
  async addNotification(req, res) {
    try {
      await NotificationService.addNotification(req);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getNotifications(req, res) {
    try {
      let listNotification = await NotificationService.getNotification(req);
      console.log(listNotification);
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new NotificationController();
