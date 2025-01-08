import Navbar from "@/components/ui/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
// import { Hero } from "../Pages/Student/Hero";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
