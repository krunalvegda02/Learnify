import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, category } = req.body;
  if (!title || !category) {
    throw new ApiError(400, "Course Title And Category must be provided");
  }

  const course = await Course.create({
    title: title,
    category: category,
    creator: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course Created Succesfully"));
});

export { createCourse };
