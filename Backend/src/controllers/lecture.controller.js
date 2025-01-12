import { Lecture } from "../models/lecture.model.js";
import { Course } from "../models/Course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  deleteLectureFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

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
  const { title, isPreviewFree } = req.body;
  const { lectureVideoFile } = req.files;
  if (!title || !lectureVideoFile || !isPreviewFree) {
    throw new ApiError(400, "Please Provide Details to Update");
  }

  const lecture = await Lecture.findById(lectureId);

  if (title) lecture.title = title;
  if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

  if (lectureVideoFile) {
    if (lecture.lectureVideo) {
      try {
        const videoId = lecture.lectureVideo.split("/").pop().split(".")[0];
        await deleteLectureFromCloudinary(videoId);
      } catch (error) {
        throw new ApiError(400, "Error Deleting VIdeo from CLoudinary");
      }
    }
    try {
      await uploadMedia(lectureVideoFile.path);
      lecture.lectureVideo = lectureVideoFile?.secure_url;
    } catch (error) {
      throw new ApiError(400, "Error Uploading Video Lecture");
    }
  }
});

const getUserLectures = asyncHandler(async (req, res) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId).populate("lectures");
  if (!course) {
    throw new ApiError(400, "Course not Found");
  }
  //poping lectures array
  const lecture = course.lectures;
  return res
    .status(200)
    .json(
      new ApiResponse(200, lecture, "Course Lectures Fetched Successfully")
    );
});

export { createLecture, updateLecture, getUserLectures };
