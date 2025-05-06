import { useEffect } from "react";
import { AiFillProduct, AiOutlineMenuUnfold } from "react-icons/ai";
import { BiPurchaseTag, BiHistory } from "react-icons/bi";
import { FaChartPie, FaUsers, FaShoppingCart } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/features/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { StateType } from "../../../interfaces/interfaces";
import { GrAppsRounded } from "react-icons/gr";

const SideBar: React.FC<StateType> = ({ isOpen, setIsOpen }) => {
  const loggedInUser = useAppSelector(selectCurrentUser);
  const userRole = loggedInUser?.role || "customer";

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpen]);

  return (
    <div
      className={`bg-gray-900 text-white min-h-full transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between py-3 px-4 bg-primary">
        {isOpen && (
          <span className="text-md lg:text-lg font-semibold whitespace-nowrap">
            {userRole === "admin" ? "Admin Panel" : "My Account"}
          </span>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-white text-xl ${
            !isOpen && "w-full flex justify-center"
          }`}
        >
          {isOpen ? (
            <RiCloseLargeFill className="ms-5" />
          ) : (
            <AiOutlineMenuUnfold className="text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav
        className={`${
          !isOpen && " text-2xl flex justify-center items-center"
        } mt-4`}
      >
        <ul className="space-y-2 pt-1">
          {userRole === "admin" ? (
            <>
              <li>
                <NavLink
                  to="/adminDashboard/overview"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <GrAppsRounded />
                  {isOpen && <span className="ml-3">Overview</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/adminDashboard/allProducts"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <AiFillProduct />
                  {isOpen && <span className="ml-3">Products</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/adminDashboard/allUsers"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <FaUsers />
                  {isOpen && <span className="ml-3">Users</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/adminDashboard/reports"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <FaChartPie />
                  {isOpen && <span className="ml-3">Reports</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/adminDashboard/allOrders"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <BiPurchaseTag />
                  {isOpen && <span className="ml-3">Orders</span>}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/customerDashboard/allOrders"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <BiPurchaseTag />
                  {isOpen && <span className="ml-3">My Orders</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <FaShoppingCart />
                  {isOpen && <span className="ml-3">Shopping Cart</span>}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                      isActive ? "bg-gray-700" : ""
                    }`
                  }
                >
                  <BiHistory />
                  {isOpen && <span className="ml-3">My Profile</span>}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;