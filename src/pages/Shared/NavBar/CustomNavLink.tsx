import { NavLink } from "react-router-dom";

const CustomNavLink = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick?: () => void;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `${isActive ? "bg-primary font-semibold" : "hover:bg-primary"} block w-full px-4 py-2 transition-colors text-center`
    }
    onClick={onClick}
  >
    {label}
  </NavLink>
);

export default CustomNavLink;
