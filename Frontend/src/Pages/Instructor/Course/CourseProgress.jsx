import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useGetCourseProgressQuery,
  useMarkAsCompletedMutation,
  useMarkAsIncompletedMutation,
  useUpdateLectureProgressMutation,
} from "@/Redux/Features/Api/courseProgressApi";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const courseId = useParams().courseId;
  const [currLecture, setCurrLecture] = useState(null);

  const { data, isLoading, isError, error, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();

  const [
    completeCourse,
    { data: completeCoursedata, isSuccess: completeCourseSuccess },
  ] = useMarkAsCompletedMutation();
  const [
    incompleteCourse,
    { data: inCompleteCoursedata, isSuccess: inCompleteSuccess },
  ] = useMarkAsIncompletedMutation();

  // console.log(data);
  useEffect(() => {
    // console.log(completeCoursedata);

    if (completeCourseSuccess) {
      refetch();
      toast.success(completeCoursedata.data);
    }
    if (inCompleteSuccess) {
      refetch();
      toast.success(inCompleteCoursedata.data);
    }
  }, [completeCourseSuccess, inCompleteCoursedata]);

  if (isLoading) return <p>Loading..</p>;
  const { completed, courseDetails, progress } = data.data;

  // Initialize the first lecture if not exist
  const InitialLecture =
    currLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureID) => {
    // console.log("progreshh", progress);
    return progress.some((prog) => prog.lectureId === lectureID && prog.viewed);
  };

  const handleUpdateCourseProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrLecture(lecture);
    handleUpdateCourseProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await incompleteCourse(courseId);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-[5rem] ">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.title}</h1>
        <Button
          variant={completed ? "outline" : "default"}
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
        >
          {completed ? (
            <div className="flex items-center gap-1 text-base">
              <CheckCircle2 /> Completed
            </div>
          ) : (
            <div> Mark as Completed </div>
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 h-fit rounded-lg shadow-lg p-4 md:w-3/5 md:mr-6 ">
          <div>
            <video
              src={currLecture?.lectureVideo || InitialLecture.lectureVideo}
              controls
              onPlay={() =>
                handleUpdateCourseProgress(
                  currLecture?._id || InitialLecture?._id
                )
              }
              className="w-full h-auto md:rounded-lg"
            />
            {/* {console.log("id", currLecture?._id, InitialLecture?._id)} */}
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
                onClick={() => handleSelectLecture(lecture)}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currLecture?._id
                    ? "bg-gray-200 dark:bg-gray-800"
                    : ""
                }`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
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

                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      className="bg-green-200 font-bold text-green-600"
                      variant={"outline"}
                    >
                      Completed
                    </Badge>
                  )}
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
