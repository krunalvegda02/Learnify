import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import RichTextEditor from "@/components/ui/RichTextEditor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useUpdateCourseMutation,
} from "@/Redux/Features/Api/CourseApi";
import { toast } from "sonner";

function CourseTab() {
  const [input, setInput] = useState({
    title: "",
    price: "",
    subtitle: "",
    category: "",
    description: "",
    courseLevel: "",
    thumbnail: "",
    isPublished: "",
  });

  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  const {
    data: coursedata,
    isLoading: courseisLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);
  const course = coursedata?.data;
  // console.log("course", course);

  // Use Effect for GetCourseById
  useEffect(() => {
    if (course) {
      setInput({
        title: course.title,
        price: course.price || "",
        subtitle: course.subtitle || "",
        category: course.category,
        description: course.description || "",
        courseLevel: course?.courseLevel || "",
        thumbnail: course.thumbnail || "",
        isPublished: course.isPublished,
      });
    }
    // console.log("input", input);
  }, [course]);

  // for input field
  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // for category input change
  const SelectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  // for course Level input change
  const SelectCouseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  // for thumbnail input file change
  const fileChanger = (e) => {
    // console.log("thumbnail", e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, thumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const [updateCourse, { data, isLoading, isSuccess, error }] =
    useUpdateCourseMutation();
  // Save Button CLick
  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("subtitle", input.subtitle);
    formData.append("description", input.description);
    formData.append("price", input.price);
    formData.append("category", input.category);
    formData.append("thumbnailFile", input.thumbnail); // This must be a valid file object
    formData.append("courseLevel", input.courseLevel);

    await updateCourse({ formdata: formData, courseId });
  };
  // Use Effect for Updating Course
  useEffect(() => {
    if (isSuccess) {
      console.log("data", data);
      navigate(`/admin/course`);
      toast.success(data?.message || "Course Updated Succesfully");
    }

    if (error) {
      toast.error(error || "Error Updating Course");
      console.log("error", error);
    }
  }, [isSuccess, error]);

  const [publishCourse, { isLoading: publishIsloading }] =
    usePublishCourseMutation();

  const publishHandler = async (action) => {
    console.log("action", action);

    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to Change Publish Status");
    }
  };

  const [deleteCourse, { isLoading: deleteIsLoading }] =
    useDeleteCourseMutation();

  const deleteCourseHandler = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteCourse(courseId);
      if (response.data) {
        toast.success("Course deleted successfully.");
        navigate("/admin/course");
      }
    } catch (err) {
      toast.error(err?.message || "Error deleting course.");
    }
  };

  if (courseisLoading || deleteIsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-xl">Basic Course Information</CardTitle>
          <CardDescription>
            Make Changes to your courses here. Click save when you are done.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={course.lectures.length === 0 || publishIsloading}
            variant="outline"
            onClick={() =>
              publishHandler(course.isPublished ? "false" : "true")
            }
          >
            {publishIsloading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
              </>
            ) : course.isPublished ? (
              "Unpublish"
            ) : (
              "Publish"
            )}
          </Button>
          <Button onClick={deleteCourseHandler}>Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label className="mb-0.5">Title</Label>
            <Input
              type="text"
              placeholder="Title of Course"
              name="title"
              onChange={changeEventHandler}
              value={input.title}
            ></Input>
          </div>

          <div>
            <Label className="mb-1.5">Subtitle</Label>
            <Input
              onChange={changeEventHandler}
              type="text"
              placeholder="Subtitle of Course"
              name="subtitle"
              value={input.subtitle}
            ></Input>
          </div>

          <div>
            <Label className="mb-2.5">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex itesm-center gap-5">
            <div>
              <Label className="mb-1.5">Category</Label>
              <Select onValueChange={SelectCategory} value={input.category}>
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
                    <SelectItem value="php development">
                      PHP Developer
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5">Course Level </Label>
              <Select
                required
                onValueChange={SelectCouseLevel}
                value={input.courseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in INR</Label>
              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={changeEventHandler}
                placeholder="price"
              ></Input>
            </div>
          </div>
          <div>
            <Label className="mb-0.5">Choose Thumbnail</Label>
            <Input
              onChange={fileChanger}
              type="file"
              accept="image/*"
              className="w-fit"
            ></Input>
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="e-64 my-2 "
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                navigate("/admin/course");
              }}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseTab;
