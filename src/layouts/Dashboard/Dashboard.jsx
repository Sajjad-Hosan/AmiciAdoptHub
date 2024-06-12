import {
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { MdOutlinePets } from "react-icons/md";
import { LuLeaf } from "react-icons/lu";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { useState } from "react";
import Title from "../../components/Title/Title";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import UserNav from "../../dashComponents/UserNav/UserNav";
import SmNavbar from "../../dashComponents/SmNavbar/SmNavbar";
import { HiOutlineViewGrid } from "react-icons/hi";
import AdminNav from "../../dashComponents/AdminNav/AdminNav";
import useAdmin from "../../hooks/useAdmin";
import Profile from "../../components/Profile/Profile";
const Dashboard = () => {
  const { signOutUser, isDark } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const [openPro, setOpenPro] = useState(false);

  const handleOpenPro = () => setOpenPro(!openPro);

  const handleLogout = () => {
    signOutUser().then(() => {
      toast.success("Logout");
      navigate("/");
    });
  };

  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  return (
    <>
      <Profile open={openPro} handleOpen={handleOpenPro} />
      <div className="flex flex-col md:flex-row">
        <div className="flex md:hidden justify-between z-20 items-center px-6 py-3">
          <Button variant="outlined" onClick={openDrawer}>
            <HiOutlineViewGrid className="text-lg " />
          </Button>
          <Title />
        </div>
        <SmNavbar open={open} setOpen={setOpen} />
        <Card
          className={`w-full max-w-[15rem] p-3 border-r-2 rounded-none overflow-hidden hidden md:flex `}
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Title />
          </div>
          <List>
            {isAdmin ? <AdminNav /> : <UserNav />}
            <hr className="my-2 border-blue-gray-50" />
            <Link to="/">
              <ListItem>
                <ListItemPrefix>
                  <HomeIcon className="w-5 h-5" />
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
            <ListItem onClick={handleOpenPro}>
              <ListItemPrefix>
                <UserCircleIcon className="w-5 h-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemPrefix>
                <FaPersonWalkingDashedLineArrowRight />
              </ListItemPrefix>
              Logout
            </ListItem>
          </List>
        </Card>
        <div className="overflow-scroll w-full h-[42.3rem]">
          <div className="overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
