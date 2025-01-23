import { Course } from "../models/Course.model.js";
import { courseProgress } from "../models/courseProgress.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getCourseProgress = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;
  console.log("userId", userId);

  //   step-1 Fetch user course progress
  let course_progress = await courseProgress
    .findOne({ courseId, userId })
    .populate("courseId");

  const courseDetails = await Course.findById(courseId).populate("lectures");
  if (!courseDetails) {
    throw new ApiError(401, "Course not found");
  }

  //   step-2 If no progress founf, return course details with empty progress
  if (!course_progress) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { courseDetails, completed: false, progress: [] })
      );
  }

  //   step-3 return the user's course progress along with course details
  return res.status(200).json(
    new ApiResponse(200, {
      courseDetails,
      completed: course_progress.courseCompleted,
      progress: course_progress.lectureProgress,
    })
  );
});

const updateLectureProgress = asyncHandler(async (req, res) => {
  const { courseId, lectureId } = req.params;
  // console.log(req.params);
  const userId = req.user._id;

  // fetch and create courseProgress
  let course_progress = await courseProgress.findOne({ courseId, userId });

  if (!course_progress) {
    // if no course progress found then create a new one
    course_progress = new courseProgress({
      userId,
      courseId,
      lectureProgress: [],
    });
  }

  //   find the lecture progress in the course progress
  const lectureIndex = course_progress.lectureProgress.findIndex(
    (lecture) => lecture.lectureId === lectureId
  );

  //it gives -1 means that lecture exists so we have to update its status
  if (lectureIndex !== -1) {
    //if lecture already exists , update its status
    course_progress.lectureProgress[lectureIndex].viewed = true;
  } else {
    // add new lecture progress because lectureIndex gives us -1 index so lecture progress is null rightnow
    course_progress.lectureProgress.push({
      lectureId,
      viewed: true,
    });
  }

  // If all lectures are completed
  const lectureProgressLength = course_progress.lectureProgress.filter(
    (lectureProgress) => lectureProgress.viewed
  ).length;

  const course = await Course.findById(courseId);
  if (course.lectures.length === lectureProgressLength)
    course_progress.courseCompleted = true;

  await course_progress.save();

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        course_progress,
        "Lecture progress updated successfully."
      )
    );
});

const markAsComplete = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const course_progress = await courseProgress.findOne({ courseId, userId });
  if (!course_progress) throw ApiError(401, "Course not Found");

  course_progress.lectureProgress.map(
    (lectureProgress) => (lectureProgress.viewed = true)
  );
  course_progress.courseCompleted = true;
  await course_progress.save();

  return res.status(200).json(new ApiResponse(200, "Course mark as complete"));
});

const markAsIncomplete = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user._id;

  const course_progress = await courseProgress.findOne({ courseId, userId });
  if (!course_progress) throw ApiError(401, "Course not Found");

  course_progress.lectureProgress.map(
    (lectureProgress) => (lectureProgress.viewed = false)
  );
  course_progress.courseCompleted = false;
  await course_progress.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Course mark as Incomplete"));
});

export {
  getCourseProgress,
  updateLectureProgress,
  markAsComplete,
  markAsIncomplete,
};
