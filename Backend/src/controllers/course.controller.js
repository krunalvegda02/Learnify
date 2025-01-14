import { Course } from "../models/Course.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { removeLecture } from "./lecture.controller.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

const createCourse = asyncHandler(async (req, res) => {
  const { title, category } = req.body;
  console.log("req.body", req.body);

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
    return res.status(400, "User does not Publish any Courses");
  }

  if (courses.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "Instructor Doesn't Publish any Course"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, courses, "Instuctor Courses Fetched"));
});

const updateCourse = asyncHandler(async (req, res) => {
  console.log("req", req.body);
  console.log(req.file);

  const { courseId } = req.params;
  const { title, subtitle, description, category, price, courseLevel } =
    req.body;
  const thumbnailFile = req.file;
  // console.log(req.file);

  if (
    !title &&
    !subtitle &&
    !description &&
    !category &&
    !price &&
    !courseLevel
  ) {
    return res
      .status(400)
      .json(new ApiResponse(400, "Please Provide any Fields For Update"));
  }

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

  const deleteCourse = await Course.findById(courseId);
  if (!deleteCourse) {
    throw new ApiError(404, "Error Deleting Course");
  }

  if (deleteCourse.thumbnail) {
    const thumbnailId = deleteCourse.thumbnail.split("/").pop().split(".")[0];
    console.log("thumbnailId", thumbnailId);

    await deleteMediaFromCloudinary(thumbnailId);
  }

  // const courseLectures = deleteCourse.lectures;
  // const deleteLectures = await courseLectures.map((lectureId) =>
  //   removeLecture({ params: { lectureId } }, res)
  // );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deleteLectures }, "Course Deleted Succesfully")
    );
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

const getPublishedCourse = asyncHandler(async (req, res) => {
  
  const courses = await Course.find({ isPublished: true }).populate({
    path: "creator",
    select: "username avatar",
  });
  if (!courses) {
    throw new ApiError(404, "Course not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, courses, "Published Course Fetched Succesfully")
    );
});

const togglePublishCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { publish } = req.query;

  const course = await Course.findById(courseId);
  if (!course) {
    throw new ApiError(494, "Course not found");
  }

  course.isPublished = publish === "true";
  await course.save({ validateBeforeSave: false });

  const statusMsg = course.isPublished ? "Published" : "not Published";
  return res
    .status(200)
    .json(new ApiResponse(200, course, `Course is ${statusMsg}`));
});

export {
  createCourse,
  getCreatorCourses,
  updateCourse,
  deleteCourse,
  getCourseById,
  togglePublishCourse,
  getPublishedCourse,
};
