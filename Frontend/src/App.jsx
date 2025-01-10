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
          path: "/login",
          element: <Authentication />,
        },
        {
          path: "/my-learning",
          element: <MyLearning />,
        },
        {
          path: "/profile",
          element: <Profile />,
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
              path: "courses",
              element: <CourseTable />,
            },
          ],
        },

        // {
        //   path: "/add-course",
        //   element: <Courses/>
        // }
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
