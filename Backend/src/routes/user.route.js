import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  logOutUser,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(isAuthenticated, logOutUser);
userRouter.route("/profile").get(isAuthenticated, getUserProfile);

export default userRouter;
