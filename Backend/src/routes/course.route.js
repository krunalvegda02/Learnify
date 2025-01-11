import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  getCreatorCourses,
} from "../controllers/course.controller.js";

const courseRouter = Router();
courseRouter.use(isAuthenticated);

courseRouter.route("/").post(createCourse);
courseRouter.route("/").get(getCreatorCourses);

export default courseRouter;
