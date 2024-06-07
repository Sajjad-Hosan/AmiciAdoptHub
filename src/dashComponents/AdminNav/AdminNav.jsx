import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { LuUsers, LuList } from "react-icons/lu";
import { BsHouseCheck } from "react-icons/bs";
const AdminNav = () => {
  return (
    <>
      <Link to="admin_users">
        <ListItem>
          <ListItemPrefix>
            <LuUsers />
          </ListItemPrefix>
          Users
        </ListItem>
      </Link>
      <Link to="admin_pets">
        <ListItem>
          <ListItemPrefix>
            <LuList />
          </ListItemPrefix>
          Pets
        </ListItem>
      </Link>
      <Link to="admin_donations">
        <ListItem>
          <ListItemPrefix>
            <BsHouseCheck />
          </ListItemPrefix>
          Donations
        </ListItem>
      </Link>
    </>
  );
};

export default AdminNav;
