import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Hero from "./Pages/Student/Hero";
import Courses from "./Pages/Student/Courses";
import MainLayout from "./Layout/MainLayout";
import Authentication from "./Pages/Authentication";
import MyLearning from "./Pages/Student/MyLearning";
import Profile from "./Pages/Student/Profile";
import Dashboard from "./Pages/Instructor/Dashboard";
import Sidebar from "./Pages/Instructor/Sidebar";
import CourseTable from "./Pages/Instructor/Course/CourseTable";
import AddCourse from "./Pages/Instructor/Course/AddCourse";
import EditCourse from "./Pages/Instructor/Course/EditCourse";
import CreateLecture from "./Pages/Instructor/Lecture/CreateLecture";
import EditLecture from "./Pages/Instructor/Lecture/EditLecture";
import CourseDetails from "./Pages/Instructor/Course/CourseDetails";
import CourseProgress from "./Pages/Instructor/Course/CourseProgress";
import SearchPage from "./Pages/Student/SearchPage";

function App() {
  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <Hero />
              <Courses />
            </>
          ),
        },
        {
          path: "login",
          element: <Authentication />,
        },
        {
          path: "my-learning",
          element: <MyLearning />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "course/search",
          element: <SearchPage />,
        },
        {
          path: "details/:courseId",
          element: <CourseDetails />,
        },
        {
          path: "progress/:courseId",
          element: <CourseProgress />,
        },

        // Admin routes
        {
          path: "admin",
          element: <Sidebar />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "course",
              element: <CourseTable />,
            },
            {
              path: "course/create",
              element: <AddCourse />,
            },
            {
              path: "course/:courseId",
              element: <EditCourse />,
            },
            {
              path: "course/:courseId/lecture",
              element: <CreateLecture />,
            },
            {
              path: "course/:courseId/lecture/:lectureId",
              element: <EditLecture />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  );
}

export default App;
