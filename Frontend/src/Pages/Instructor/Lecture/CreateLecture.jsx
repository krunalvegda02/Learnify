import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCreateLectureMutation } from "@/Redux/Features/Api/lectureApi";
import { toast } from "sonner";

function CreateLecture() {
  const [lectureTitle, setLecturetitle] = useState();
  const courseId = useParams().courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  const createLectureHandler = async () => {
    await createLecture({ title, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture Created Successfully");
    }

    if (error) {
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
          onChange={(e) => setTitle(e.target.value)}
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
    </div>
  );
}

export default CreateLecture;
