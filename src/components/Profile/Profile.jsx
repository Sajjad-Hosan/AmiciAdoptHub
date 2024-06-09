import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Avatar, Card, Dropdown } from "flowbite-react";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import { toast } from "sonner";
import { FaPersonWalkingDashedLineArrowRight } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
const Profile = ({ open, handleOpen }) => {
  const { user, signOutUser, handleCooking } = useAuth();

  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    signOutUser().then(() => {
      toast.success("Logout");
    });
  };
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader />
      <DialogBody>
        <div className="flex justify-end">
          <span className="border px-7 py-2 font-semibold rounded-xl">
            {isAdmin ? "Admin" : "Normal"}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL}
            alt=""
            className="w-52 my-4 rounded-full object-cover"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.displayName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <Button
              onClick={handleLogout}
              className="w-full flex items-center gap-3"
            >
              <FaPersonWalkingDashedLineArrowRight /> Logout
            </Button>
            {isAdmin ? (
              <Button
                className="w-full flex items-center gap-3"
                onClick={() => handleCooking("We are working on it!")}
              >
                <FiUserPlus /> left admin
              </Button>
            ) : (
              <Button
                className="w-full flex items-center gap-3"
                onClick={() => handleCooking("We are working on it!")}
              >
                <FiUserPlus /> Be a admin
              </Button>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter />
    </Dialog>
  );
};
Profile.propTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
};
export default Profile;
