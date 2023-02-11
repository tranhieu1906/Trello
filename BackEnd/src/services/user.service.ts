import { User } from "../models/User";
class UserService {
  async getDataUser(req, res) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    return user;
  }

  async getEmail(req, res) {
    const regex = new RegExp(req.params.input, "i");
    const users = await User.find({
      email: regex,
    }).select("-password");
    return users
  }
}

export default new UserService();
