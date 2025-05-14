import { useState, useEffect } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const currentCategory = searchParams.get("category");

  const {
    data: user,
    isLoading,
  } = useGetUserByEmailQuery(loggedInUser?.user || "", {
    skip: !loggedInUser?.user,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close category menu when a category is selected
  useEffect(() => {
    setShowCategoryMenu(false);
  }, [currentCategory]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");

    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const navLinks = [
    { to: "/products", label: "Products" },
    { to: "#", label: "Category" },
    { to: "/services", label: "Services" },
    { to: "/gallery", label: "Gallery" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const categories = [
    { name: "Mountain", param: "Mountain" },
    { name: "Road", param: "Road" },
    { name: "Hybrid", param: "Hybrid" },
    { name: "Electric", param: "Electric" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="w-[91%] mx-auto flex justify-between items-center py-3 text-base-100">
        <NavLink to="/">
          <img className="h-10" src={logo} alt="logo" />
        </NavLink>

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
              <li key={link.to} className="relative">
                {link.label === "Category" ? (
                  <span
                    onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                    className={`px-1 text-lg cursor-default flex items-center gap-2 ${
                      currentCategory ? "text-secondary font-semibold" : ""
                    }`}
                  >
                    {link.label}
                    <span
                      className={`${
                        showCategoryMenu &&
                        "rotate-[180deg] duration-200 text-secondary"
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
                      {categories.map((category) => (
                        <li key={category.param}>
                          <NavLink
                            to={`/products?category=${category.param}`}
                            className={`block py-2 hover:text-primary ${
                              currentCategory === category.param
                                ? "text-seconsary font-semibold bg-primary"
                                : ""
                            }`}
                            onClick={() => setShowCategoryMenu(false)}
                          >
                            {category.name}
                          </NavLink>
                        </li>
                      ))}
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
                `px-4 py-1 text-sm uppercase rounded transition duration-300 border border-secondary font-bold ${
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 right-0 z-50 bg-secondary w-[50%] md:w-[30%] py-1">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.to}>
                  {link.label === "Category" ? (
                    <>
                      <button
                        className={`w-full flex justify-center px-4 py-2 hover:bg-primary text-left ${
                          currentCategory ? " font-semibold" : ""
                        }`}
                        onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                      >
                        {link.label}
                      </button>
                      {showCategoryMenu && (
                        <ul className="px-4 py-2 space-y-2 border-l-2 border-primary text-center bg-primary">
                          {categories.map((category) => (
                            <li key={category.param}>
                              <NavLink
                                to={`/products?category=${category.param}`}
                                className={`block py-1 hover:text-secondary ${
                                  currentCategory === category.param
                                    ? "text-secondary font-semibold"
                                    : ""
                                }`}
                                onClick={() => {
                                  setShowCategoryMenu(false);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                {category.name}
                              </NavLink>
                            </li>
                          ))}
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
                </li>
              ))}
              {isLoading ? (
                <li>
                  <ProfileDropdownSkeleton />
                </li>
              ) : user ? (
                <li className="text-center">
                  <ProfileDropdown
                    user={user.data}
                    handleLogout={handleLogout}
                  />
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
    </div>
  );
}