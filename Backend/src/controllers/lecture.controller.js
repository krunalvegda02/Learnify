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

  const lecture = await Lecture.create({ title, courseId });

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
  // console.log("file", req.file);
  // console.log("body", req.body);
  // console.log("param", req.params);
  const { title, isPreviewFree } = req.body;
  const { lectureId } = req.params;
  console.log(req.params);

  const lectureVideoFile = req.file;

  if (!title && !isPreviewFree && !lectureVideoFile) {
    throw new ApiError(400, "Please Provide Details to Update");
  }

  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    throw new ApiError(404, "Lecture Not Found");
  }

  // For Uploading Lectures
  let lectureVideo;
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
      lectureVideo = await uploadMedia(lectureVideoFile.path);
      // console.log("lectureVideo", lectureVideo);
      lecture.publicId = lectureVideo.public_id;
      lecture.lectureVideo = lectureVideo?.secure_url;
    } catch (error) {
      console.log(error);
      throw new ApiError(400, "Error Uploading Video Lecture");
    }
  }

  if (title) lecture.title = title;
  if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;

  const updatedLecture = await lecture.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedLecture, "Lecture Updated Succesfully"));
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

const removeLecture = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;

  const lecture = await Lecture.findByIdAndDelete(lectureId);
  if (!lecture) {
    throw new ApiError(400, "Error deleting Lecture");
  }

  // delete lecture From Cloudinary
  if (lecture.publicId) {
    await deleteLectureFromCloudinary(lecture.publicId);
  }

  // remove lecture reference from course
  await Course.updateOne(
    { lectures: lectureId },
    { $pull: { lectures: lectureId } }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Lecture Deleted Succesfully"));
});

const getLecturebyId = asyncHandler(async (req, res) => {
  const { lectureId } = req.params;

  const lecture = await Lecture.findById(lectureId);
  if (!lecture) {
    throw new ApiError(400, "No lecture Found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, lecture, "Lecture Fetched Succesfully"));
});

export {
  createLecture,
  updateLecture,
  getUserLectures,
  removeLecture,
  getLecturebyId,
};
