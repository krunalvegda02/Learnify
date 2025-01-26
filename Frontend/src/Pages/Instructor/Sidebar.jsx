import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[230px] sm:[300px] space-y-8 border-r-gray-300  dark:border-[hsl(217.2 32.6% 17.5%)] bg-[#f0f0f0] dark:bg-[#070b1cf7] p-5 sticky top-0 h-screen  ">
        <div className="mt-14 space-y-4 ">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={25} />
            <h1 className="font-normal text-lg">Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={25} />
            <h1 className="font-normal text-lg">Courses</h1>
          </Link>
        </div>
      </div>
      <div className="mt-10 flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}

export default Sidebar;
