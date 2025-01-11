import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/Redux/Features/Api/CourseApi";
import { Delete, EditIcon, Loader2, PlusIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery();

  if (isLoading) {
    return <Loader2 />;
  }
  console.log("data", data.data);

  return (
    <div>
      <Button onClick={() => navigate("create")}>
        <PlusIcon /> Create Course
      </Button>
      <Table>
        <TableCaption>
          <p className="text-base text-black"> Your Courses</p>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title </TableHead>
            <TableHead className="w-[130px]">Status</TableHead>
            <TableHead className="w-[130px]">Price</TableHead>
            <TableHead className="w-[180px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((course) => (
            <TableRow key={course._id}>
              <TableCell>
                <p className="truncate text-base">{course.title}</p>
              </TableCell>
              <TableCell className="font-medium">
                {course.price || "NA"}
              </TableCell>
              <TableCell>
                {course.isPublished ? (
                  <p className="text-green-900 bg-green-200 p-0.5 px-1.5 rounded-sm w-20 flex justify-center">
                    Published
                  </p>
                ) : (
                  <p className="text-gray-600 bg-gray-200 p-0.5 px-1.5 rounded-sm w-14 flex justify-center ">
                    Draft
                  </p>
                )}
              </TableCell>

              <TableCell className="text-center">
                <Button size="sm" variant="ghost" className="text-green-800 " onClick={() => navigate(`${course._id}`)}>
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
