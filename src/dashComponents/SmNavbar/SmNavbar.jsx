import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { MdOutlinePets } from "react-icons/md";
import { LuLeaf } from "react-icons/lu";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";

import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import UserNav from "../UserNav/UserNav";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import AdminNav from "../AdminNav/AdminNav";
import useAdmin from "../../hooks/useAdmin";

const SmNavbar = ({ open, setOpen }) => {
  const [isAdmin] = useAdmin();
  const { signOutUser, isDark } = useAuth();
  const closeDrawer = () => setOpen(false);
  const handleLogout = () => {
    signOutUser().then(() => {
      toast.success("Logout !");
    });
  };
  return (
    <>
      <Drawer
        open={open}
        onClose={closeDrawer}
        className={isDark ? "bg-transparent" : ""}
      >
        <div className="mb-2 flex items-center justify-between p-4">
          <Title />
        </div>
        <hr className="my-2 border-blue-gray-50" />

        {isAdmin ? <AdminNav /> : <UserNav />}
        <List>
          <hr className="my-2 border-blue-gray-50" />
          <Link to="/">
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </ListItem>
          </Link>
          <Link to="/pet_listing">
            <ListItem>
              <ListItemPrefix>
                <MdOutlinePets />
              </ListItemPrefix>
              Pet Listing
            </ListItem>
          </Link>
          <Link to="/donation_page">
            <ListItem>
              <ListItemPrefix>
                <LuLeaf />
              </ListItemPrefix>
              Donation Page
            </ListItem>
          </Link>
          <hr />
          <Link to="/profile">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <FaPersonWalkingDashedLineArrowRight />
            </ListItemPrefix>
            Logout
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
SmNavbar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};
export default SmNavbar;
