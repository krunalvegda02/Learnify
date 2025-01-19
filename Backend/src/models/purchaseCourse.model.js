import mongoose from "mongoose";

const purchaseCourseSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    PaymentId: {
      type: String,
      // required: true,
    },
  },
  { timeStamps: true }
);

export const purchaseCourse = mongoose.model(
  "purchaseCourse",
  purchaseCourseSchema
);
