import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/userUtils.js";

export default {
  async register(email, username, password) {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exist!");
    }

    return User.create({
      username,
      email,
      password,
    });
  },

  async login(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User or username are not Valid");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("User or usrename are not Valid");
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: "4h" });

    return token;
  },
};
