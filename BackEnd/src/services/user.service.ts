import { User } from "../models/User";
import bcrypt from "bcrypt";

class UserService {
  async getDataUser(req, res) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    return user;
  }
  async updatePassword(req) {
    console.log(req.body);
    let newPassword = await bcrypt.hash(req.body.newPassword, 10);
    console.log(newPassword);
    let update = await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: newPassword },
      { new: true }
    );
    if (update) {
      console.log(update);
      return update;
    }
  }
  async getEmail(req, res) {
    const regex = new RegExp(req.params.input, "i");
    const users = await User.find({
      email: regex,
    }).select("-password");
    return users;
  }
}

export default new UserService();
