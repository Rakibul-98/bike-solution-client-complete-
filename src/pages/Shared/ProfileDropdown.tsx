import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { UserType } from "../../interfaces/interfaces";

interface ProfileDropdownProps {
  user: UserType;
  handleLogout: () => void;
}

const ProfileDropdown = ({ user, handleLogout }: ProfileDropdownProps) => {

    const { user_name, profile_image, role } = user;
    const image = profile_image || "https://ibb.co.com/mCdw2wR9"

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} className="">
        <CgProfile className="text-3xl text-center" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu mt-3 z-[1] flex items-center w-44 whitespace-nowrap leading-loose text-center font-semibold uppercase text-xs border-2 shadow-xl bg-neutral -me-[17px]">
        <div className="avatar placeholder my-2">
          <div className="ring-primary w-10 rounded-full ring ring-offset-2">
          <img src={image} alt="" />
          </div>
        </div>
        <p className=" text-black">{ user_name}</p>
        <Link className="w-full py-1 mt-2 bg-pink-500 hover:bg-pink-600" to={`/${role}Dashboard`}>Dashboard</Link>
        <Link className="w-full py-1 mt-2 bg-primary/80 hover:bg-primary" to="/profile">View Profile</Link>
        <button onClick={handleLogout} className="w-full py-1 mt-2 bg-red-500 hover:bg-red-600 uppercase">Logout</button>
      </ul>
  </div>
  );
};

export default ProfileDropdown;
