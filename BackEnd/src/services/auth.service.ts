import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import Token from "../middlewares/jwt.middleware";

class AuthService {
  async getUser(req, res) {
    const user = await User.findOne({ email: req.body.email });
    return user;
  }

  async addUser(req, res) {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    let userData = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    };
    await User.create(userData);
  }

  async setToken (user) {
    let payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };
    const accessToken = await Token.signAccessToken(payload);
    return accessToken;
  }
}

// @ts-ignore
export default new AuthService();