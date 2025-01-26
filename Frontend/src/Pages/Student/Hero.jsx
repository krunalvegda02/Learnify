import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== 0) {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-violet-500 to bg-violet-600 dark:from-gray-800  dark:to-gray-900 py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-semibold mb-4">
          Find the Best Couses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8 font-xl">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form
          className="flex items-center bg-white  border-none  text-black dark:text-gray-100 rounded-full shadow-lg max-w-xl overflow-hidden  mx-auto mb-6"
          onSubmit={searchHandler}
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className=" flex-grow focus-visible:ring-0  rounded-l-full  px-6 py-3 placeholder-gray-400  dark:placeholder-gray-500 dark:text-black" 
            placeholder="Search Courses..."
          ></Input>
          <Button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 "
          >
            Search
          </Button>
        </form>
        <Button
          className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
          onClick={() => navigate(`/course/search?query=${""}`)}
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
}

export default Hero;
