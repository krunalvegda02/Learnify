import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  getCourseById,
  getCreatorCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import upload from "../middlewares/multer.middleware.js";

const courseRouter = Router();
courseRouter.use(isAuthenticated);

courseRouter.route("/").post(createCourse);
courseRouter.route("/").get(getCreatorCourses);
courseRouter
  .route("/:courseId")
  .patch(upload.single("thumbnailFile"), updateCourse);
courseRouter.route("/:courseId").get(getCourseById);

export default courseRouter;
