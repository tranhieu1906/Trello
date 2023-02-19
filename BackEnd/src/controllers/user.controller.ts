import UserService from "../services/user.service";
import { User } from "../models/User";
import userService from "../services/user.service";
import bcrypt from "bcrypt";

class UserController {
  async getUser(req, res) {
    try {
      const user = await UserService.getDataUser(req);
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
      const users = await UserService.getEmail(req, res);
      res.json(users.filter((user) => user.id !== req.user.id));
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }

  // async editPassword(req, res) {
  //   try {
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
      let user = await userService.getDataUser(req);
      const { password } = req.body;
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        let updatePassword = await UserService.updatePassword(req, res);
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

  async updateProfile(req, res, next) {
    try {
      let user = await userService.getDataUser(req);
      if (user) {
        let dataUser = await userService.updateProfile(req);

        res.status(200).json({
          success: true,
          message: "Cập nhật thành công",
          user: dataUser,
        });
      } else {
        res.status(400).json({
          message: "Không tồn tại",
        });
      }
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
