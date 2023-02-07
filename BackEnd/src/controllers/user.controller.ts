import UserService from "../services/user.service";
import { User } from "../models/User";

class UserController {
  async getUser(req, res) {
    try {
      const user = await UserService.getDataUser(req, res);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "the user doesn't exist" });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  async getUserEmail(req, res) {
    try {
      const regex = new RegExp(req.params.input, "i");
      const users = await User.find({
        email: regex,
      }).select("-password");

      res.json(users.filter((user) => user.id !== req.user.id));
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

export default new UserController();
