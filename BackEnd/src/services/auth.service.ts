import bcrypt from "bcrypt";
import { User } from "../models/User";

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
}

// @ts-ignore
export default new AuthService();