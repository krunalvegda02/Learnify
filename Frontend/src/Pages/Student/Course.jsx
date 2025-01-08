import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function Course() {
  return (
    <div>
      <Card className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.PJ87QhnDB4G5r6GynPSEVwHaEO&pid=Api&P=0&h=180"
            alt="Course"
            className="w-full h-36 object-cover rounded-t-lg "
          ></img>
        </div>
        <CardContent className="px-5 py-3 space-y-1">
          <h1 className="hover:underline font-bold text-lg truncate">
            Frontend Nextjs Complete Course
          </h1>
          <div className="items-center justify-between flex">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <h1 className="font-medium text-sm">Vegda Krunal</h1>
            </div>
            <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              Advance
            </Badge>
          </div>
          <div>
            <span className="font-bold text-lg">₹999</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Course;
