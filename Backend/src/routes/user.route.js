import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  logOutUser,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(isAuthenticated, logOutUser);
userRouter.route("/profile").get(isAuthenticated, getUserProfile);
userRouter
  .route("/profile/update")
  .patch(isAuthenticated, upload.single("avatarFile"), updateProfile);

export default userRouter;
