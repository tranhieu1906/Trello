import UserService from "../services/user.service";
import { User } from "../models/User";

class UserController {
  async getUser(req, res) {
    try {
      const user = await UserService.getDataUser(req);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Người dùng không tồn tại" });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  async getUserEmail(req, res) {
    try {
      const users = await UserService.getEmail(req, res);
      res.json(users.filter((user) => user.id !== req.user.id));
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new UserController();
