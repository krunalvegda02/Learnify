import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/Course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createLecture = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { courseId } = req.params;
  console.log(req.body, req.params);

  if (!title || !courseId) {
    throw new ApiError(404, "Lecture title is required to create Lecture");
  }

  const lecture = await Lecture.create({ title });

  const course = await Course.findById(courseId);
  if (course) {
    course.lectures.push(lecture._id);
    await course.save();
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { lecture, course }, "Leacture Created succefully")
    );
});

const updateLecture = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;
});

export { createLecture, updateLecture };
