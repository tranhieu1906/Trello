import { User } from "../models/User";
import bcrypt from "bcrypt";

class UserService {
  async getDataUser(req, res) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    return user;
  }

  // async newPassword(req, res) {
  //   const id = req.user.id;
  //   let user = await this.getDataUser(req, res);
  //   const { oldPassword, newPassword } = req.body;
  //   const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  //   let password = "";
  //   if (isPasswordMatch) {
  //     password = await bcrypt.hash(newPassword, 10);
  //     let update = await User.updateOne(
  //       { _id: id },
  //       {
  //         password: password,
  //       },
  //       { new: true }
  //     );
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

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
}

export default new UserService();
