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
import React, { useState } from "react";

function LectureTab() {
  const [title, setTitle] = useState("");
  const [isFree, setIsFree] = useState(true);
  const [uploadVideoFile, setUploadVideoFile] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadVideoFile(file);
      console.log(file);
    }
  };

  const updateLecture = async () => {};

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
          <Button variant="destructive">Remove Lecture</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label className="mb-1.5">Title</Label>
          <Input
            type="text"
            placeholder="Enter title for Lecture"
            value={title}
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
          <Switch id="freeVideo" value={isFree} />
          <Label htmlFor="freeVideo">Is this Video FREE</Label>
        </div>
        <div>
          <Button onClick={updateLecture}> Update Lecture</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LectureTab;
