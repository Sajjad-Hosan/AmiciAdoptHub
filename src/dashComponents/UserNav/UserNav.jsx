import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  VscAdd,
  VscChecklist,
  VscFeedback,
  VscEmptyWindow,
  VscLinkExternal,
  VscOutput,
} from "react-icons/vsc";

const UserNav = () => {
  return (
    <>
      <Link to="add_pet">
        <ListItem>
          <ListItemPrefix>
            <VscAdd />
          </ListItemPrefix>
          Add pet
        </ListItem>
      </Link>
      <Link to="added_pets">
        <ListItem>
          <ListItemPrefix>
            <VscChecklist />
          </ListItemPrefix>
          My Add pets
        </ListItem>
      </Link>
      <Link to="adoption_request">
        <ListItem>
          <ListItemPrefix>
            <VscFeedback />
          </ListItemPrefix>
          Adoption Request
        </ListItem>
      </Link>
      <Link to="create_campaign">
        <ListItem>
          <ListItemPrefix>
            <VscEmptyWindow />
          </ListItemPrefix>
          Create Campaign
        </ListItem>
      </Link>
      <Link to="donation_campaign">
        <ListItem>
          <ListItemPrefix>
            <VscLinkExternal />
          </ListItemPrefix>
          Donation Campaign
        </ListItem>
      </Link>
      <Link to="my_donations">
        <ListItem>
          <ListItemPrefix>
            <VscOutput />
          </ListItemPrefix>
          My Donations
        </ListItem>
      </Link>
    </>
  );
};

export default UserNav;
