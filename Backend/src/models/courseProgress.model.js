import mongoose, { Schema } from "mongoose";

const lectureProgressSchema = new Schema({
  lectureId: {
    type: String,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
});

const courseProgressSchema = new Schema({
  userId: {
    type: String,
  },
  courseId: {
    type: String,
  },
  courseCompleted: {
    type: Boolean,
    default: false,
  },
  lectureProgress: [lectureProgressSchema],
});

export const courseProgress = mongoose.model(
  "courseProgress",
  courseProgressSchema
);
