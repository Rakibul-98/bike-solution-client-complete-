import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/features/hooks";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/features/store";
import { useGetUserByEmailQuery } from "../../../redux/features/users/usersApi";
import ProfileDropdown from "../ProfileDropdown";
import { ProfileDropdownSkeleton } from "../ProfileDropdownSkeleton";
import CartIcon from "./CartIcon";
import CustomNavLink from "./CustomNavLink";
import logo from "../../../assets/images/logo (3) (1).png";
import { IoIosArrowDown } from "react-icons/io";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const {
    data: user,
    // error,
    isLoading,
  } = useGetUserByEmailQuery(loggedInUser?.user || "", {
    skip: !loggedInUser?.user,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");

    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const navLinks = [
    { to: "/products", label: "Products" },
    { to: "/category", label: "Category" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/blogs", label: "Blogs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-50 flex justify-between items-center shadow-lg py-3 bg-primary text-base-100 px-16">
      <NavLink to="/">
        <img className="h-10" src={logo} alt="logo" />
      </NavLink>
      {/* <Searchbar /> */}

      {/* Mobile Cart Icon and Menu Toggle */}
      <div className="flex items-center gap-3 lg:hidden">
        <CartIcon cartItems={cartItems} />
        <button
          className=""
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <HiX className="text-3xl hover:text-secondary" />
          ) : (
            <HiMenu className="text-3xl hover:text-secondary" />
          )}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex">
        <ul className="nav flex gap-3">
          {navLinks.map((link) => (
            <li
              key={link.to}
              className="relative"
            >
              {link.label === "Category" ? (
                <span
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className={` px-1 text-lg cursor-default flex items-center gap-2`}
                >
                  {link.label}
                  <span
                    className={`${
                      showCategoryMenu && "rotate-[180deg] duration-200 text-secondary"
                    }`}
                  >
                    <IoIosArrowDown />
                  </span>
                </span>
              ) : (
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "border-b-[3px] border-secondary text-secondary font-semibold"
                        : "hover:bg-primary"
                    } px-1 text-lg hover:border-b-[3px] border-secondary`
                  }
                >
                  {link.label}
                </NavLink>
              )}

              {/* Mega Menu */}
              {link.label === "Category" && showCategoryMenu && (
                <div className="absolute -left-5 top-11 bg-secondary w-52 z-50">
                  <ul className="space-y-2 text-center">
                    <li>
                      <NavLink
                        to="/category/sport"
                        className="hover:text-primary"
                      >
                        Sport Bikes
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category/cruiser"
                        className="hover:text-primary"
                      >
                        Cruisers
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category/scooter"
                        className="hover:text-primary"
                      >
                        Scooters
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/category/electric"
                        className="hover:text-primary"
                      >
                        Electric
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Cart and Profile */}
      <div className="hidden lg:flex items-center gap-5">
        <CartIcon cartItems={cartItems} />
        {isLoading ? (
          <ProfileDropdownSkeleton />
        
        ) : user ? (
          <ProfileDropdown user={user.data} handleLogout={handleLogout} />
        ) : (
          <NavLink
            to="/login"
            state={{ from: location.pathname }}
            className={({ isActive }) =>
              `px-4 py-1 text-sm uppercase rounded transition duration-300 border border-secondary   font-bold ${
                isActive
                  ? "bg-transparent border-base-100"
                  : "bg-secondary hover:bg-primary hover:text-secondary/90"
              }`
            }
          >
            Login
          </NavLink>
        )}
      </div>
      {/* Mobile Cart and Profile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 right-0 z-50 bg-secondary w-[50%] md:w-[30%] py-1">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                {link.label === "Category" ? (
                  <>
                    <button
                      className="w-full px-4 py-2 hover:bg-primary"
                      onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                    >
                      {link.label}
                    </button>
                    {showCategoryMenu && (
                      <ul className=" px-4 py-2 space-y-2 border-l-2 border-primary text-center bg-primary">
                        <li className="hover:bg-secondary">
                          <NavLink
                            to="/category/sport"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sport Bikes
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/category/cruiser"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Cruisers
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/category/scooter"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Scooters
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/category/electric"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Electric
                          </NavLink>
                        </li>
                      </ul>
                    )}
                  </>
                ) : (
                  <CustomNavLink
                    to={link.to}
                    label={link.label}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                )}
                {/* <CustomNavLink
                  to={link.to}
                  label={link.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                /> */}
              </li>
            ))}
            {isLoading ? (
              <li>
                <ProfileDropdownSkeleton />
              </li>
            ) : user ? (
              <li className="text-center">
                <ProfileDropdown user={user.data} handleLogout={handleLogout} />
              </li>
            ) : (
              <li className="pt-1 pb-2">
                <NavLink
                  to="/login"
                  state={{ from: location.pathname }}
                  className={({ isActive }) =>
                    `w-[90%] mx-auto block py-2 text-sm uppercase transition duration-300 border-2 border-primary font-bold text-center ${
                      isActive && "bg-primary"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
