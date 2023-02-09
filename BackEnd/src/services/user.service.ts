import { User } from "../models/User";
class UserService {
  async getDataUser(req, res) {
    const id = req.user._id;
    const user = await User.findOne({ id: id });
    return user;
  }
}

export default new UserService();
