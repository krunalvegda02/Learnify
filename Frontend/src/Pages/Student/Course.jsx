import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

function Course({ course }) {
  // console.log("course", course);

  return (
    <div>
      <Card className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src={
              course?.thumbnail ||
              "https://img.freepik.com/premium-vector/computer-monitor-with-red-background-red-square-that-saysthe-number-40on-it_327903-2259058.jpg?w=360"
            }
            alt="Course"
            className="w-full h-36 mb-1 object-cover rounded-t-lg "
          ></img>
        </div>
        <CardContent className="px-5 pb-1 space-y-0.5">
          <Link to={`/details/${course._id}`}>
            <h1 className="hover:underline font-bold text-lg truncate">
              {course.title}
            </h1>
          </Link>

          <div className="flex items-center justify-between gap-2  ">
            <div className="flex items-center gap-0.5 ">
              <Avatar className="h-9 w-9">
                <AvatarImage src={course.creator?.avatar} alt="avatar" />
              </Avatar>
              <h1 className="font-medium text-sm overflow-hidden whitespace-nowrap">
                {course.creator?.username}
              </h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              {course?.courseLevel}
            </Badge>
          </div>
          <div>
            <span className="font-bold text-lg trucate">
              {course?.price || "NA"} {course?.price && "₹"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Course;
