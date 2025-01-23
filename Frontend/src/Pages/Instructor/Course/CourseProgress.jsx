import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useGetCourseProgressQuery } from "@/Redux/Features/Api/courseProgressApi";
import { current } from "@reduxjs/toolkit";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CourseProgress = () => {
  const courseId = useParams().courseId;
  const [currLecture, setCurrLecture] = useState(null);

  const { data, isLoading, isError, error, refetch } =
    useGetCourseProgressQuery(courseId);
  console.log(data);

  if (isLoading) return <p>Loading..</p>;
  const { completed, courseDetails, progress } = data.data;
  // Initialize the first lecture if not exist
  const InitialLecture =
    currLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  return (
    <div className="max-w-6xl mx-auto p-4 mt-[5rem] ">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.title}</h1>
        <Button>Make Payment</Button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 h-fit rounded-lg shadow-lg p-4 md:w-3/5 md:mr-6 ">
          <div>
            <video
              src={currLecture?.lectureVideo || InitialLecture.lectureVideo}
              controls
              className="w-full h-auto md:rounded-lg"
            />
          </div>

          <div className="mt-2">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) => lec._id === (currLecture?._id || InitialLecture._id)
                ) + 1
              }: ${currLecture?.title || InitialLecture.title} `}
              {}
            </h3>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l md:p-4 pt-4 md:pt-0 border-gray-200">
          <h2 className="font-semibold text-xl mb-4">Course Lecture </h2>

          <div className="flex-1 overflow-y-auto">
            {courseDetails.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className="mb-3 hover:cursor-pointer transition transform"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {completed ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-400 mr-2" />
                    )}

                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.title}
                      </CardTitle>
                    </div>
                  </div>

                  <Badge
                    className="bg-green-200 font-bold text-green-600"
                    variant={"outline"}
                  >
                    {completed ? "Completed" : ""}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
