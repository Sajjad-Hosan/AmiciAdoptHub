import { Link } from "react-router-dom";
import { Switch } from "@material-tailwind/react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import pro1 from "../../assets/Profile_Pics/profile1.jpg";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import { VscGear } from "react-icons/vsc";
import useAdmin from "../../hooks/useAdmin";
import { useState } from "react";
import Profile from "../Profile/Profile";
const ProfileNav = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const { user, signOutUser, handleCooking } = useAuth();
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    signOutUser().then(() => {
      toast.success("Logout");
    });
  };
  return (
    <>
      <Profile open={open} handleOpen={handleOpen} />
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="" src={user?.photoURL || pro1} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-20 p-4 shadow bg-gray-700 rounded-box w-52 space-y-3 text-white"
        >
          <li>
            <button onClick={() => handleCooking("We are working on it!")}>
              <VscGear /> Setting
            </button>
          </li>
          <li>
            <button className="w-full" onClick={handleOpen}>
              <FaRegUserCircle /> Profile
            </button>
          </li>
          <li>
            {isAdmin ? (
              <Link to="/dashboard/admin_users">
                <MdOutlineDashboardCustomize /> Dashboard
              </Link>
            ) : (
              <Link to="/dashboard/adoption_request">
                <MdOutlineDashboardCustomize /> Dashboard
              </Link>
            )}
          </li>
          {isAdmin ? (
            ""
          ) : (
            <li>
              {" "}
              <button
                className="w-full"
                onClick={() => handleCooking("We are working on it!")}
              >
                <FiUserPlus /> Be a admin
              </button>
            </li>
          )}
          <div className="divider"></div>
          <li>
            <button onClick={handleLogout} className="w-full">
              <FaPersonWalkingDashedLineArrowRight /> Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileNav;
