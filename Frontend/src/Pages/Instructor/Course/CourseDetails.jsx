import { Button } from "@/components/ui/button";
import PurchaseCourseBtn from "@/components/ui/PurchaseCourseBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, PlayCircle } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "@/Redux/Features/Api/CourseApi";

const CourseDetails = () => {
  const courseId = useParams().courseId;
  console.log(courseId,"courseID");
  
  const { data, isLoading } = useGetCourseByIdQuery(courseId);

  const purchase = false;

  if (isLoading) {
    return <SkeletonCard />;
  }
  console.log("data", data.data);
  return (
    <div className="mt-[3.2rem] space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{data.data?.title}</h1>
          <p className="text-base md:text-lg ">{data.data.subtitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {data.data.title}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} /> <p>Last Updated {data.data.updatedAt}</p>
          </div>
          <p>Students Enrolled: 1</p>
        </div>
      </div>
      {/* Left side COntent */}
      <div className=" max-w-6xl mx-auto my-5 px-4 md:px-8 flex  flex-col lg:flex-row justify-between gap-10 ">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
            molestiae quod, accusantium perspiciatis minus, explicabo sit quia
            sed expedita odio rerum quibusdam consequatur ducimus aliquid
            dignissimos modi saepe, voluptas necessitatibus eius sequi excepturi
            quisquam? Itaque dicta rem numquam vel eos obcaecati repellendus
            similique culpa nihil magni voluptatibus, voluptate tempore sed
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course COntente</CardTitle>
              <CardDescription>4 lectures </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((lecture, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span>
                    {true ? <PlayCircle size={16} /> : <Lock size={16} />}
                  </span>
                  <p>Lecture title </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Right SIde Card */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">video</div>
              <h1>Lectue title</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                Course Price:
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchase ? (
                <Button className="w-full">Continue Course</Button>
              ) : (
                <PurchaseCourseBtn courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

const SkeletonCard = () => {
  return (
    <div className="mt-[3.2rem] space-y-5 ">
      {/* Header Skeleton */}
      <div className="bg-[#2D2F31] ">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-3">
          <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-1/3 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-6xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Side Skeleton */}
        <div className="w-full lg:w-2/3 space-y-5">
          <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="h-4 w-2/3 bg-gray-300 rounded "></div>
            <div className="h-6 w-1/2 bg-gray-300 rounded "></div>
            <div className="h-4 w-1/3 bg-gray-300 rounded animate-pulse"></div>
            <div className="space-y-3">
              {[1, 2].map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Skeleton */}
        <div className="w-full lg:w-1/3">
          <div className="border border-gray-200 rounded-lg p-4 flex flex-col space-y-4">
            <div className="w-full aspect-video bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-6 w-1/3 bg-gray-300 rounded animate-pulse"></div>
            <div className="mt-4">
              <div className="animate-pulse h-10 w-full bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
