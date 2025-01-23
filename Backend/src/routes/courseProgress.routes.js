import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCourseProgress,
  markAsComplete,
  markAsIncomplete,
  updateLectureProgress,
} from "../controllers/courseProgress.controller.js";

const courseProgressRouter = Router();

// courseProgressRouter.use(isAuthenticated);

courseProgressRouter.route("/:courseId").get(isAuthenticated,getCourseProgress);
courseProgressRouter
  .route("/:courseId/lecture/:lectureId/view")
  .post(updateLectureProgress);
courseProgressRouter.route("/:courseId/complete").get(markAsComplete);
courseProgressRouter.route("/:courseId/incomplete").get(markAsIncomplete);

export default courseProgressRouter;
