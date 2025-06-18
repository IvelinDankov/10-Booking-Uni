import { Router } from "express";
import userService from "../services/userService.js";
import { AUTH_COOKIE } from "../utils/userUtils.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import errorMsg from "../utils/errorMsg.js";

const userController = Router();

userController.get("/register", authMiddleware.guard, (req, res) => {
  res.render("user/register");
});

userController.post("/register", authMiddleware.guard, async (req, res) => {
  const { email, username, password, rePassword } = req.body;

  try {
    if (password !== rePassword) {
      throw new Error("Password mismach!");
    }

    await userService.register(email, username, password);

    const token = await userService.login(username, password);

    res.cookie(AUTH_COOKIE, token);

    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);

    res.render("user/register", { username, email, error });
  }
});

userController.get("/login", authMiddleware.guard, (req, res) => {
  res.render("user/login");
});
userController.post("/login", authMiddleware.guard, async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await userService.login(username, password);

    res.cookie(AUTH_COOKIE, token);

    res.redirect("/");
  } catch (err) {
    const error = errorMsg(err);
    res.render("user/login", { username, error });
  }
});

userController.get("/logout", authMiddleware.auth, (req, res) => {
  res.clearCookie(AUTH_COOKIE);

  res.redirect("/");
});

export default userController;
