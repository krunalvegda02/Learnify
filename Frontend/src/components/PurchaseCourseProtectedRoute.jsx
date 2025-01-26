import { useGetCourseDetailswithStatusQuery } from "@/Redux/Features/Api/purchaseApi";
import { Loader } from "lucide-react";
import { useParams, Navigate } from "react-router-dom";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetCourseDetailswithStatusQuery(courseId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (!data?.purchased) {
    return <Navigate to={`/details/${courseId}`} />;
  }

  return children;
};

export default PurchaseCourseProtectedRoute;
