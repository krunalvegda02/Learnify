import React, { useEffect } from "react";
import { Button } from "./button";
import { useCreateCheckOutSessionMutation } from "@/Redux/Features/Api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const PurchaseCourseBtn = ({ courseId }) => {
  console.log(courseId);

  const [createCheckoutsession, { data, isSuccess,isLoading, isError, error }] =
    useCreateCheckOutSessionMutation({ courseId });

  const purchaseCourseHandler = async () => {
    await createCheckoutsession({ courseId });
  };
  console.log("data", data, isSuccess);

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Invalid response from server");
      }

      if (isError) {
        toast.error("Failed to create checkout session");
      }
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button
      className="w-full"
      disabled={isLoading}
      onClick={purchaseCourseHandler}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default PurchaseCourseBtn;
