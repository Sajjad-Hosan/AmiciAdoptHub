import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { MdOutlinePets } from "react-icons/md";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { useState } from "react";
import Title from "../../components/Title/Title";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import UserNav from "../../dashComponents/UserNav/UserNav";

const Dashboard = () => {
  const { user, signOutUser } = useAuth();
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser().then(() => {
      toast.success("Logout");
      navigate("/");
    });
  };
  return (
    <div className="flex">
      <Card className="w-full max-w-[18rem] p-4 border-r-2 rounded-none hidden md:flex">
        <div className="mb-2 flex items-center gap-4 p-4">
          <Title />
        </div>
        <List>
          {admin ? "" : <UserNav />}
          <hr className="my-2 border-blue-gray-50" />
          <Link to="/">
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </ListItem>
          </Link>
          <ListItem>
            <ListItemPrefix>
              <MdOutlinePets />
            </ListItemPrefix>
            Pet Listing
          </ListItem>
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
      </Card>
      <div className="overflow-scroll w-full h-[42.3rem]">
        <div className="overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
