import { raw, Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCheckoutSession,
  stripeWebhook,
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
} from "../controllers/purchaseCourse.controller.js";

export const router = Router();
// router.use(isAuthenticated);

router
  .route("/checkout/create-checkout-session")
  .post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(raw({ type: "applicaiton/json" }), stripeWebhook);

router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated,getCourseDetailWithPurchaseStatus);

  router.route("/").get(isAuthenticated,getAllPurchasedCourse);
