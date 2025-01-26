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
courseRouter.use(isAuthenticated);

courseRouter.route("/search").get(searchCourse);
courseRouter.route("/").post(createCourse);
courseRouter.route("/").get(getCreatorCourses);
courseRouter
  .route("/:courseId")
  .patch(upload.single("thumbnailFile"), updateCourse);
courseRouter.route("/:courseId").get(getCourseById);
courseRouter.route("/:courseId").delete(deleteCourse);
courseRouter.route("/c/publish-courses").get(getPublishedCourse);

courseRouter.route("/:courseId/publish").patch(togglePublishCourse);

export default courseRouter;
