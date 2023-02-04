import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AuthService from "../services/auth.service";
import Token from "../middlewares/jwt.middleware";

export class AuthController {
  static async register(req, res) {
    try {
      const user = await AuthService.getUser(req, res);
      if (!user) {
        await AuthService.addUser(req, res);
        res.status(201).json({ message: "Add user complete" });
      } else {
        res.status(409).json({ message: "email did exist" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async login(req, res) {
    try {
      const user = await AuthService.getUser(req, res);

      if (user) {
        const comparePass = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!comparePass) {
          return res.status(401).json({ message: "password wrongs" });
        }
        let payload = {
          id: user._id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        };
        const accessToken = await Token.signAccessToken(payload);
        res.status(200).json({
          userToken: accessToken,
          user,
        });
      } else {
        res.status(401).json({ message: "user dosen't exist" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
