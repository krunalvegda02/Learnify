import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateLectureMutation,
  useGetUserLectureQuery,
} from "@/Redux/Features/Api/lectureApi";
import { toast } from "sonner";
import Lecture from "../Lecture/Lecture.jsx";

function CreateLecture() {
  const [lectureTitle, setLecturetitle] = useState("");
  const courseId = useParams().courseId;
  const navigate = useNavigate();

  // for getting All lectures
  const {
    data: lectureData,
    isLoading: lectureLoading,
    error: lectureError,
    refetch,
  } = useGetUserLectureQuery({ courseId });

  console.log("lecture", lectureData?.data);

  // for Creating any lecture
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    // console.log(lectureTitle);
    await createLecture({ title: lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setLecturetitle("");
      toast.success(data?.message || "Lecture Created Successfully");
    }

    if (error) {
      c;
      toast.error("Error Creating Lecture");
    }
  }, [isSuccess, error]);

  return (
    <div>
      <div className="my-4">
        <h1 className="font-bold text-xl">
          Lets add Lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, saepe!
        </p>
      </div>
      <div>
        <Label className="mb-0.5">Title</Label>
        <Input
          type="text"
          placeholder="Your Course Name"
          name="title"
          value={lectureTitle}
          onChange={(e) => setLecturetitle(e.target.value)}
          className="mb-1.5"
        />
      </div>
      <div className="flex gap-2 mt-2">
        <Button
          variant="outline"
          onClick={() => {
            navigate(`/admin/course/${courseId}`);
          }}
        >
          Back
        </Button>
        <Button disabled={isLoading} onClick={createLectureHandler}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create"
          )}
        </Button>
      </div>

      <div className="mt-5">
        {lectureLoading ? (
          <div className="flex justify-center mt-10 ">
            <Loader className="h-7 w-7 animate-spin " />
          </div>
        ) : lectureError ? (
          <p className="flex justify-center text-xl font-normal text-red-500 mt-20 ">
            Failed to Load Lectures !
          </p>
        ) : lectureData.data.length === 0 ? (
          <p className="flex justify-center text-xl font-normal F mt-20">
            No lectures Added
          </p>
        ) : (
          lectureData.data.map((lecture, index) => {
            return (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default CreateLecture;
