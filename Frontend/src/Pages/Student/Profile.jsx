import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";

function Profile() {
  const isLoading = false;
  const enrolledCourses = [1, 2, 1];

  return (
    <div className="my-24 max-w-5xl  mx-auto px-4">
      <h1 className="font-bold text-2xl text-center sm:text-left ">Profile</h1>

      <div className="my-5">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <div className="flex flex-col sm:flex-row md:flex-row items-center md:items-start gap-8 ">
            <div className="flex items-center flex-col">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mb-4">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </div>
            <div>
              <div className="mb-2">
                <h1 className="font-semibold text-xl text-gray-900 dark:text-gray-300 ml-2">
                  Name:
                  <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                    Vegda Krunal D.
                  </span>
                </h1>
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-xl text-gray-900 dark:text-gray-300 ml-2">
                  Email:
                  <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                    Krunavegda@gmail.com
                  </span>
                </h1>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-xl text-gray-900 dark:text-gray-300 ml-2">
                  Role:
                  <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                    Instructor
                  </span>
                </h1>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make Changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 px-3">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-left">Username</Label>
                        <Input placeholder="Username" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-left">Avatar</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button disabled={isLoading} type="submit">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span className="text-gray-400">
                              {" "}
                              Please wait..
                            </span>
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </div>

      <h1 className="font-medium text-lg">Courses You're enrolled in</h1>
      <div className="my-5">
        {isLoading ? (
          <CoursesSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {enrolledCourses.length === 0 ? (
              <h1>Your havn't enrolled yet</h1>
            ) : (
              enrolledCourses.map((course, index) => <Course key={index} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;

// Skeleton for Profile Details
const ProfileSkeleton = () => (
  <div className="flex flex-col sm:flex-row gap-8 animate-pulse">
    <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gray-300 dark:bg-gray-700" />
    <div className="flex flex-col space-y-4">
      <div className="h-6 w-64 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="h-6 w-56 bg-gray-300 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

// Skeleton for Enrolled Courses
const CoursesSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
      />
    ))}
  </div>
);
