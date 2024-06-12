import { FaUser } from "react-icons/fa6";
import { CgMenuRightAlt } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProfileNav from "../ProfileNav/ProfileNav";
import Title from "../Title/Title";

// NavbarComponent
const NavbarCom = () => {
  const { user } = useAuth();
  const navList = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/pet_listing">Pet Listing</NavLink>
      </li>
      <li>
        <NavLink to="/donation_page">Donation Campnings</NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar bg-base-100 bg-opacity-25 md:px-10 rounded-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <CgMenuRightAlt className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-6 z-20 p-4 shadow bg-gray-700 rounded-box w-56 space-y-2 text-white"
            >
              {navList}{" "}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            <Title />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navList}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <ProfileNav />
          ) : (
            <Link to="/login" className="btn btn-outline px-10">
              <FaUser /> Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarCom;
