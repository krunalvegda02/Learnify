import React from "react";
import Course from "./Course";

function MyLearning() {
  const isLoading = false;
  const MyLearningCourses = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="max-w-5xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Learning</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : MyLearningCourses.length === 0 ? (
          <p>You are not enrolled any course</p>
        ) : (
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MyLearningCourses.map((course, index) => (
              <Course key={index} />
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
