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

const getCreatorCourses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const courses = await Course.find({ creator: userId });
  if (!courses) {
    throw new ApiError(404, "Course Not Found");
  }

  if (courses.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Instructor Doesn't Publish any Course"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Instuctor Courses Fetched"));
});

export { createCourse, getCreatorCourses };
