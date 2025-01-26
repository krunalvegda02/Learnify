import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import SeachFilter from "./SearchFilter";
import SearchResult from "./SearchResult";
import { useSearchCourseQuery } from "@/Redux/Features/Api/CourseApi";

const SearchPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const courseId = "feskjnjsd";

  const { data, isLoading } = useSearchCourseQuery({
    query: query,
    categories: selectedCategories,
    sortByPrice: sortByPrice,
  });

  const isEmpty = !isLoading && data.data?.length === 0;
  console.log(isEmpty);
  
  console.log("data", data);

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="my-8 ">
        <h1 className="text-bold text-xl md:text-2xl">result for {query}</h1>
        <p>
          Showing Results for{" "}
          <span className="text-blue-500 font-bold italic">{query}</span>
        </p>
      </div>
      <div className="flex flex-col  md:flex-row gap-10">
        <SeachFilter handleFilterChange={handleFilterChange} />

        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data.data?.map((course) => <SearchResult course={course} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  console.log("Course not found");
  
  return (
    <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
      <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
        Course Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
        Sorry, we couldn't find the course you're looking for.
      </p>
      <Link to="/" className="italic">
        <Button variant="link">Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col md:flex-row justify-between border-b border-gray-300 py-4">
      <div className="h-32 w-full md:w-64">
        <Skeleton className="h-full w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2 flex-1 px-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-20 mt-2" />
      </div>

      <div className="flex flex-col items-end justify-between mt-4 md:mt-0">
        <Skeleton className="h-6 w-12" />
      </div>
    </div>
  );
};
