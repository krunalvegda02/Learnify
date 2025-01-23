import React from "react";
import SearchCoursePage from "./SearchCoursePage";

const SearchPage = () => {
  const isLoading = false;

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="my-6">
        <h1>Resurngkejdbkj</h1>
        <p>
          Showing Results for{" "}
          <span className="text-blue-500 font-bold italic">
            Frontend Developer
          </span>
        </p>
      </div>
      <div className="flex flex-col  md:flex-row gap-10">
        <SearchCoursePage />
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return <p>Loading...</p>;
};
