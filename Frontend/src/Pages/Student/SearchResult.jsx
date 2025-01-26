import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  console.log("course at result", course);

  return (
    <div className="flex flex-col  md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-3 shadow-md gap-4 ">
      <Link
        to={`/details/${course?._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course?.thumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">{course.title}</h1>
          <p className="text-sm text-gray-600"> {course.subtitle}</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold ">Vegda Krunal</span>
          </p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl ">₹ {course.price}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
