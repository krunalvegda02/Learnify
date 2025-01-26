import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/Redux/Features/Api/authApi";

function MyLearning() {
  const { data, isLoading } = useLoadUserQuery();
  const MyLearningCourses = data?.data.enrolledCourses || [];

  return (
    <div className="max-w-6xl mx-auto my-24 px-4 md:px-4 ">
      <h1 className="font-semibold  text-2xl">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : MyLearningCourses.length === 0 ? (
          <p>You have not enrolled any course</p>
        ) : (
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MyLearningCourses.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
          //   <Course />
        )}
      </div>
    </div>
  );
}

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
