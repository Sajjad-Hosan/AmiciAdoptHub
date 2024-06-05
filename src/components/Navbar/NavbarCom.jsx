import { FaUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProfileNav from "../ProfileNav/ProfileNav";
import Title from "../Title/Title";

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
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-20 p-4 shadow bg-base-100 rounded-box w-52 space-y-2"
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
