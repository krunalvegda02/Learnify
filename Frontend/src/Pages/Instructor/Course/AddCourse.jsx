import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/Redux/Features/Api/CourseApi";
import { toast } from "sonner";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const creatCourseHandler = async () => {
    await createCourse({ title, category });
  };

  useEffect(() => {
    if (isSuccess) {
      // console.log("data", data.data._id);
      navigate(`/admin/course/${data.data._id}`);
      toast.success(data?.message || "Course Created Succesfully");
    }

    if (error) {
      toast.error("Error Creating Course");
    }
  }, [isSuccess, error]);

  return (
    <div className=" mx-10">
      <div className="my-4">
        <h1 className="font-bold text-xl">
          Lets add course, add some basic details for your new course
        </h1>
        <p className="text-sm ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, saepe!
        </p>
      </div>
      <div className="space-y-4 ">
        <div>
          <Label className="mb-0.5">Title</Label>
          <Input
            type="text"
            placeholder="Your Course Name"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-1"
          />
          <Label className="mb-0.5">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="reactjs">ReactJS</SelectItem>
                <SelectItem value="nextjs">NextJS</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="frontend development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="backend development">
                  Backend Development
                </SelectItem>
                <SelectItem value="fullstack development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="mern stack development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
                <SelectItem value="php development">PHP Developer</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/admin/course");
            }}
          >
            Back
          </Button>
          <Button disabled={isLoading} onClick={creatCourseHandler}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
