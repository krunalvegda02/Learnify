import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React from "react";

const CourseProgress = () => {
  const isCompleted = true;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-[5rem] ">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Course Title</h1>
        <Button>Make Payment</Button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex-1 h-fit rounded-lg shadow-lg p-4 md:w-3/5 md:mr-6 ">
          <div>{/* <video ></video> */}</div>

          <div className="mt-2">
            <h3 className="font-medium text-lg">
              Lwcrhtuevdbuisb ckln INtroducrtion
            </h3>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l md:p-4 pt-4 md:pt-0 border-gray-200">
          <h2 className="font-semibold text-xl mb-4">Course Lecture </h2>

          <div className="flex-1 overflow-y-auto">
            {[1, 21, 22, 2].map((lecture, index) => (
              <Card
                key={index}
                className="mb-3 hover:cursor-pointer transition transform"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-400 mr-2" />
                    )}

                    <div>
                      <CardTitle className="text-lg font-medium">
                        Introduction
                      </CardTitle>
                    </div>
                  </div>

                  <Badge
                    className="bg-green-200 font-bold text-green-600"
                    variant={"outline"}
                  >
                    {isCompleted ? "Completed" : ""}
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
