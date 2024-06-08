import { Link } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import pro1 from "../../assets/Profile_Pics/profile1.jpg";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import { VscGear } from "react-icons/vsc";
import useAdmin from "../../hooks/useAdmin";
const ProfileNav = () => {
  const { user, signOutUser } = useAuth();
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    signOutUser().then(() => {
      toast.success("Logout");
    });
  };
  return (
    <>
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
            <button>
              <VscGear /> Setting
            </button>
          </li>
          <li>
            <Link to="/profile">
              <FaRegUserCircle /> Profile
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/dashboard">
              <MdOutlineDashboardCustomize /> Dashboard
            </Link>
          </li>
          {isAdmin ? '' : (
            <li>
              {" "}
              <button className="w-full">
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
