import { Button } from "@/components/ui/button";
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

const CourseDetails = () => {
  const purchase = true;

  return (
    <div className="mt-[3.2rem] space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-6xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            Course Title hey Lorem ipsum dolor sit.
          </h1>
          <p className="text-base md:text-lg ">Course sub-title</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              Vegda Kruank D.
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} /> <p>Last Updated 11-11-2024</p>
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
                <Button className="w-full">Purchase Course</Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
