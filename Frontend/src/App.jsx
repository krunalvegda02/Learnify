import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Hero from "./Pages/Student/Hero";
import Courses from "./Pages/Student/Courses";
import MainLayout from "./Layout/MainLayout";
import Authentication from "./Pages/Authentication";
import MyLearning from "./Pages/Student/MyLearning";
import Profile from "./Pages/Student/Profile";

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
