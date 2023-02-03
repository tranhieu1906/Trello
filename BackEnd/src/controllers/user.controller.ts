import UserService from "../services/user.service";
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
}

export default new UserController();
