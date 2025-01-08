import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Hero from "./Pages/Student/Hero";
import MainLayout from "./Layout/MainLayout";
import Authentication from "./Pages/Authentication";

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
              {/* <Courses/> */}
            </>
          ),
        },
        {
          path: "/login",
          element: <Authentication />,
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
