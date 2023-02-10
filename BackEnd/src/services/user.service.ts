import { User } from "../models/User";
class UserService {
  async getDataUser(req) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id }).populate("boards");
    return user;
  }
}

export default new UserService();
