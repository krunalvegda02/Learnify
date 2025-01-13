import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createLecture,
  updateLecture,
  getUserLectures,
  removeLecture,
  getLecturebyId,
} from "../controllers/lecture.controller.js";
import upload from "../middlewares/multer.middleware.js";

export const lectureRoutes = Router();
lectureRoutes.use(isAuthenticated);

lectureRoutes.route("/:courseId").post(createLecture);
lectureRoutes
  .route("/:lectureId")
  .patch(upload.single("lectureVideoFile"), updateLecture);
lectureRoutes.route("/:courseId").get(getUserLectures);
lectureRoutes.route("/:lectureId").delete(removeLecture);
lectureRoutes.route("/:lectureId").get(getLecturebyId);
