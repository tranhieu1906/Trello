import UserService from "../services/user.service";
import { User } from "../models/User";
import userService from "../services/user.service";
import bcrypt from "bcrypt";

class UserController {
  async getUser(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findOne({ _id: id });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Người dùng không tồn tại" });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  async getUserEmail(req, res) {
    try {
      const regex = new RegExp(req.params.input, "i");
      const users = await User.find({
        email: regex,
      }).select("-password");

      res.json(users.filter((user) => user.id !== req.user.id));
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  // async editPassword(req, res) {
  //   try {
  //     console.log(req.body);
  //     const newPassword = await UserService.newPassword(req, res);
  //     if (newPassword) {
  //       res
  //         .status(200)
  //         .json({ success: true, message: "đổi mật khẩu thành công!!" });
  //     } else {
  //       res
  //         .status(404)
  //         .json({ success: false, message: "mật khẩu cũ không đúng" });
  //     }
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // }
  async editPassword(req, res, next) {
    try {
      let user = await userService.getDataUser(req, res);
      const { password } = req.body;
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        let updatePassword = await UserService.updatePassword(req);
        res.status(200).json({
          success: true,
          message: "Đổi mật khẩu thành công",
        });
      } else {
        res.status(202).json({
          success: false,
          message: "Mật khẩu cũ không chính xác",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
