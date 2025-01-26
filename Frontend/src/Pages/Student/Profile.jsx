import React, { useEffect, useState } from "react";
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
import { BookOpen, Edit2Icon, Loader2, UserPen } from "lucide-react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/Redux/Features/Api/authApi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Profile() {
  //! we use [] for mutation and {} for query
  // Profile Fetch PArt
  const { data, isLoading, refetch } = useLoadUserQuery();
  const user = data?.data || {};
  console.log(user);

  const [
    updateUser,
    { data: updateUserData, isLoading: formLoading, error, isSuccess, isError },
  ] = useUpdateUserMutation();
  console.log("data", data);

  // Update profile
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  // console.log(avatar, username);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(file);
  };

  const updateUserHandler = async () => {
    console.log("username", username, "avatar", avatar);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("avatarFile", avatar);

    await updateUser(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserData.message || "Profile Updated Successfully");
    }

    if (isError) {
      toast.error("All Fields are Required");
    }
  }, [error, updateUserData, isError, isSuccess]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="my-24 max-w-5xl  mx-auto px-4">
      <div className="flex gap-2 items-center">
        <UserPen />
        <h1 className="font-semibold text-2xl text-center sm:text-left ">
          Your Profile
        </h1>
      </div>

      <div className="my-5">
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <div className="flex flex-col sm:flex-row md:flex-row items-center md:items-start gap-8 ">
            <div className="flex items-center flex-col">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 mb-4">
                <AvatarImage
                  src={
                    user?.avatar ||
                    "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                  }
                  alt="User Avatar"
                />
              </Avatar>
            </div>
            <div>
              <div className="mb-2">
                <h1 className="font-semibold text-xl text-gray-900 dark:text-gray-300 ml-2">
                  Name:
                  <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                    {user.username}
                  </span>
                </h1>
              </div>
              <div className="mb-2">
                <h1 className="font-semibold text-xl text-gray-900 dark:text-gray-300 ml-2">
                  Email:
                  <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                    {user.email}
                  </span>
                </h1>
              </div>
              <div className="mb-4">
                <h1 className="font-semibold text-xl text-gray-900 dark:text-gray-300 ml-2">
                  Role:
                  <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                    {user.role.toUpperCase()}
                  </span>
                </h1>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="text-lg">
                      Edit
                    </Button>
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
                        <Input
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-left">Avatar</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={onChangeHandler}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        disabled={formLoading}
                        type="submit"
                        onClick={updateUserHandler}
                      >
                        {formLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span className="text-gray-400">Please wait..</span>
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

      <h1 className="font-medium text-lg">Courses You're Enrolled in</h1>
      <div className="my-5">
        {isLoading ? (
          <CoursesSkeleton />
        ) : (
          <>
            {user.enrolledCourses.length === 0 ? (
              <div className="text-xl mx-auto my-14 max-w-5xl flex flex-col items-center justify-center text-center ">
                <BookOpen size={50} />
                <h1 className="font-semibold">
                  You haven't Enrolled in any Courses,{" "}
                  <Link to="/">
                    <span className=" text-blue-600 hover:text-blue-800 hover:underline">
                      Click here{" "}
                    </span>
                  </Link>
                  to explore Courses...
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ">
                {user.enrolledCourses.map((course) => (
                  <Course course={course} key={course._id} />
                ))}
              </div>
            )}
          </>
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
