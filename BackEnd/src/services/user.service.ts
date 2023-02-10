import { User } from "../models/User";
import bcrypt from "bcrypt";
class UserService {
  async getDataUser(req, res) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    return user;
  }
  async newPassword(req, res) {
    const id = req.user.id;
    let user = await this.getDataUser(req, res);
    const { oldPassword, newPassword } = req.body;
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    let password = "";
    if (isPasswordMatch) {
      password = await bcrypt.hash(newPassword, 10);
      let update = await User.updateOne(
        { _id: id },
        {
          password: password,
        },
        { new: true }
      );
      return true;
    } else {
      return false;
    }
  }
}

export default new UserService();
