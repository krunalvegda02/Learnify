import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

const updateCourse = asyncHandler(async (req, res) => {
  console.log("req", req.body);
  console.log(req.file);

  const { courseId } = req.params;
  const userId = req.user._id;
  const { title, subtitle, description, category, price, courseLevel } =
    req.body;

  const thumbnailFile = req.file;
  console.log(req.file);
  

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course not found");
  }

  if (title) course.title = title;
  if (subtitle) course.subtitle = subtitle;
  if (description) course.description = description;
  if (category) course.category = category;
  if (price) course.price = price;
  if (courseLevel) course.courseLevel = courseLevel;

  let thumbnail;
  if (thumbnailFile) {
    if (course.thumbnail) {
      try {
        const publicId = course.thumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); //delete old image
      } catch (error) {
        throw new ApiError(500, "Failed to delete the existing thumbnail");
      }
    }
    try {
      thumbnail = await uploadMedia(thumbnailFile.path);
      course.thumbnail = thumbnail?.secure_url;
    } catch (error) {
      throw new ApiError(500, "Failed to Upload the new thumbnail");
    }
  }

  const updatedCourse = await course.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedCourse, "Course Updated Succesfully"));
});

const deleteCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const deleteCourse = await Course.findByIdAndDelete(courseId);
  if (!deleteCourse) {
    throw new ApiError(404, "Error Deleting Course");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteCourse, "Course Deleted Succesfully"));
});

const getCourseById = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(404, "Course Not Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course Fetched Succesfullly"));
});

export {
  createCourse,
  getCreatorCourses,
  updateCourse,
  deleteCourse,
  getCourseById,
};
