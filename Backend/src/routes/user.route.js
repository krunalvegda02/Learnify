import express from "express";
import { registerUser } from "../controllers/user.controller";

const router = express.router();

router.route("/register").post(registerUser);


export default router;
