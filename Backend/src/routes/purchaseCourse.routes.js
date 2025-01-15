import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { purchaseCourse } from "../controllers/purchaseCourse.controller.js";

const purchaseCourseRoutes = Router();

lectureRoutes.use(isAuthenticated);

purchaseCourseRoutes.route("/success").get(hello);
purchaseCourseRoutes.route("/order").get(hello);
purchaseCourseRoutes.route("/cancel").get(hello);

export default purchaseCourseRoutes;
