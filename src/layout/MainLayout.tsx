import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/NavBar/Navbar";
import Footer from "../pages/Shared/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen relative bg-neutral">
      <Navbar />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
