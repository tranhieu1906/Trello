import { User } from "../models/User";
import bcrypt from "bcrypt";

class UserService {
  async getDataUser(req, res) {
    const id = req.user.id;
    const user = await User.findOne({ _id: id });
    return user;
  }

  async updatePassword(req) {
    let newPassword = await bcrypt.hash(req.body.newPassword, 10);
    let update = await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: newPassword },
      { new: true }
    );
    if (update) {
      return update;
    }
  }

  async updateProfile(req) {
    let newUpdate = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
      },
      { new: true }
    );
    if (newUpdate) {
      return newUpdate;
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
