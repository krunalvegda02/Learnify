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
import { Switch } from "@/components/ui/switch";
import {
  useUpdateLectureMutation,
  useDeleteLectureMutation,
  useGetLectureByIdQuery,
} from "@/Redux/Features/Api/lectureApi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader, Loader2 } from "lucide-react";
import { toast } from "sonner";

function LectureTab() {
  const lectureId = useParams().lectureId;
  const courseId = useParams().courseId;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [uploadVideoFile, setUploadVideoFile] = useState(null);

  //? Get LEcture details from Id
  const {
    data: lectureData,
    isLoading: lectureIsloading,
    error: lectureError,
  } = useGetLectureByIdQuery(lectureId);

  console.log("lectureData", lectureData);

  //? Remove Lecture
  const deleteLectureHandler = async () => {
    await deleteLecture(lectureId);
  };

  const [
    deleteLecture,
    {
      data: deleteLectureData,
      isLoading: deleteLectureLoading,
      error: deleteLectureError,
    },
  ] = useDeleteLectureMutation();

  useEffect(() => {
    if (deleteLectureData) {
      toast.success(
        deleteLectureData?.message || "Lecture Deleted Succesfully"
      );
      navigate(`/admin/course/${courseId}/lecture`);
    }

    if (deleteLectureError) {
      toast.error("Error deleting Lecture");
    }
  }, [deleteLectureData, deleteLectureError]);

  //? Update Lecture
  //file changer on updating of video lecture
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadVideoFile(file);
      console.log(file);
    }
  };

  const [updateLecture, { data, isLoading, error, isError, isSuccess }] =
    useUpdateLectureMutation();
  const updateLectureHandler = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("lectureVideoFile", uploadVideoFile);
    formData.append("isPreviewFree", isFree);

    await updateLecture({ formData, lectureId });
  };

  useEffect(() => {
    if (lectureData) {
      setIsFree(lectureData.data.isPreviewFree);
      setTitle(lectureData.data.title);
    }

    if (isSuccess) {
      toast.success(data?.message || "Lecture Updated Succesfully");

      navigate(`/admin/course/${courseId}/lecture`);
    }

    if (isError) {
      console.log("Error Updating Profile, Please try again");
    }
  }, [error, isSuccess, lectureData]);

  if (lectureIsloading) {
    return <Skeleton />;
  }

  return (
    <Card>
      <CardHeader className="flex justify-between space-y-3">
        <div>
          <CardTitle className="my-1">Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and Click save When you're done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" onClick={deleteLectureHandler}>
            {deleteLectureLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" /> Please wait...
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mb-1.5">Title</Label>
          <Input
            type="text"
            placeholder="Enter title for Lecture"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2 "
          ></Input>
        </div>
        <div>
          <Label className="mb-1.5">
            Video<span className="text-red-600">*</span>
          </Label>
          <Input
            onChange={fileChangeHandler}
            type="file"
            accept="video/*"
            className="w-fit"
          ></Input>
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={(checked) => {
              setIsFree(checked);
              console.log("switch", checked);
            }}
          />
          <Label>Is this Video FREE</Label>
        </div>
        <div>
          <Button disabled={isLoading} onClick={updateLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait..
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LectureTab;

const Skeleton = () => {
  return (
    <Card>
      <CardHeader className="flex justify-between space-y-3">
        <div>
          <div className="h-6 w-32 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded mt-2 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-24 bg-gray-300 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-10 w-full bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-10 w-full bg-gray-300 rounded animate-pulse" />
        </div>
        <div className="flex items-center space-x-2 mb-5">
          <div className="h-6 w-10 bg-gray-300 rounded-full animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
        <div>
          <div className="h-10 w-32 bg-gray-300 rounded animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
};
