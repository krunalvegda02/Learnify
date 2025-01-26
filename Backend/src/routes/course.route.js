import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCreatorCourses,
  getPublishedCourse,
  searchCourse,
  togglePublishCourse,
  updateCourse,
} from "../controllers/course.controller.js";
import upload from "../middlewares/multer.middleware.js";

const courseRouter = Router();
// courseRouter.use(isAuthenticated);

courseRouter.route("/search").get(isAuthenticated, searchCourse);
courseRouter.route("/").post(isAuthenticated, createCourse);
courseRouter.route("/").get(isAuthenticated, getCreatorCourses);
courseRouter
  .route("/:courseId")
  .patch(upload.single("thumbnailFile"), isAuthenticated, updateCourse);
courseRouter.route("/:courseId").get(isAuthenticated, getCourseById);
courseRouter.route("/:courseId").delete(isAuthenticated, deleteCourse);
courseRouter.route("/c/publish-courses").get(getPublishedCourse);

courseRouter
  .route("/:courseId/publish")
  .patch(isAuthenticated, togglePublishCourse);

export default courseRouter;
