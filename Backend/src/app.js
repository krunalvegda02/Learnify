import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

console.log("App CORS_ORIGIN:", process.env.CORS_ORIGIN);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser()); // Correctly imported and used

// Importing all routes
import userRoute from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import { lectureRoutes } from "./routes/lecture.routes.js";
import { router } from "./routes/purchaseCourse.routes.js";
import courseProgressRouter from "./routes/courseProgress.routes.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/lecture", lectureRoutes);
app.use("/api/v1/purchase", router);
app.use("/api/v1/progress", courseProgressRouter);

export default app;
