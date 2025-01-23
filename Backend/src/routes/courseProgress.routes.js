import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCourseProgress,
  markAsComplete,
  markAsIncomplete,
  updateLectureProgress,
} from "../controllers/courseProgress.controller.js";

const courseProgressRouter = Router();

courseProgressRouter.use(isAuthenticated);

courseProgressRouter.route("/:courseId").get(getCourseProgress);
courseProgressRouter
  .route("/:courseId/lecture/:lectureId/view")
  .post(updateLectureProgress);
courseProgressRouter.route("/:courseId/complete").post(markAsComplete);
courseProgressRouter.route("/:courseId/incomplete").post(markAsIncomplete);

export default courseProgressRouter;
