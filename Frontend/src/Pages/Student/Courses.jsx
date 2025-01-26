import React, { useEffect, useState } from "react";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishCourseQuery } from "@/Redux/Features/Api/CourseApi";
import { toast } from "sonner";

function Courses() {
  // const isLoading = false;
  // const courses = [1, 2, 3, 4, 5, 6];
  const [courses, setCourses] = useState();
  // console.log("courses,", courses);

  const { data, isLoading, isSuccess, error } = useGetPublishCourseQuery();

  useEffect(() => {
    if (isSuccess) {
      // console.log("data", data.data);
      setCourses(data.data);
    }

    if (error) {
      toast.error("Error Fetching Courses");
    }
  }, [isSuccess, error]);

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <CourseSkeleton key={index} />
    ));
  }

  return (
    <div className="bg-gray-50  dark:bg-[#141414]">
      <div className="max-w-6xl mx-auto  p-5 ">
        <h2 className="font-bold text-center text-2xl mb-6 font-mono">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mb-10">
          {courses &&
            courses.map((course, index) => (
              <Course key={index} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
