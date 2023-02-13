import { User } from "../models/User";
class UserService {
  async getDataUser(req) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id }).populate("boards");
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
