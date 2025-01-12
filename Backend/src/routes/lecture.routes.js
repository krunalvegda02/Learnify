import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createLecture,
  updateLecture,
} from "../controllers/lecture.controller.js";

export const lectureRoutes = Router();
lectureRoutes.use(isAuthenticated);

lectureRoutes.route("/:courseId").post(createLecture);
lectureRoutes.route("/:lectureId").patch(updateLecture);
