import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/Redux/Features/Api/CourseApi";
import { EditIcon, Loader2, PlusCircleIcon, PlusIcon } from "lucide-react";
import React from "react";
import { useNavigate, Link } from "react-router-dom";

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
          <p className="text-base text-black dark:text-gray-500 ">
            {data.data.length !== 0 && "Your Courses"}
          </p>
        </TableCaption>
        {data.data.length !== 0 && (
          <TableHeader>
            <TableRow>
              <TableHead>Title </TableHead>
              <TableHead className="w-[130px]">Price</TableHead>
              <TableHead className="w-[130px]">Status</TableHead>
              <TableHead className="w-[180px] text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {data.data.length === 0 ? (
            <div className=" flex flex-col items-center mt-20">
              <p className=" font-semibold text-xl">
                You Currently does not publish any Courses.. Please
                <Link to="/admin/course/create">
                  <span className="mx-2 text-blue-700 hover:text-blue-500 hover:underline cursor-pointer">
                    Click here
                  </span>
                </Link>
                to Create upload new Course
              </p>
            </div>
          ) : (
            data.data.map((course) => (
              <TableRow key={course._id}>
                <TableCell>
                  <p className="truncate text-base">{course.title}</p>
                </TableCell>
                <TableCell className="font-medium">
                  {`${course.price} ₹` || "NA"}
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
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-green-800 "
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
