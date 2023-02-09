import { User } from "../models/User";
class UserService {
  async getDataUser(req, res) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    return user;
  }
}

export default new UserService();
