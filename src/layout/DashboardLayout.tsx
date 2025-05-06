import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../pages/Dashboard/shared/SideBar";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  return (
    <div className=" flex min-h-[calc(100vh-100px)]">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`flex-1 p-3 transition-all duration-300
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
