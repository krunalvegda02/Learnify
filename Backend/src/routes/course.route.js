import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse } from "../controllers/course.controller.js";

const courseRouter = Router();
courseRouter.use(isAuthenticated);

courseRouter.route("/").post(createCourse);

export default courseRouter;
