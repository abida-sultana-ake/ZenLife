import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f9f9f9] text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
