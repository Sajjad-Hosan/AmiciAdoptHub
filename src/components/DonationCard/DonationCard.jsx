import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DonationCard = ({ donated, innerRef }) => {
  const {
    _id,
    image,
    maxDonationAmount,
    highestDonationAmount,
    pause,
    currentDonation,
    petName,
  } = donated;
  return (
    <div>
      <Card className="w-full overflow-hidden" ref={innerRef}>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none h-[350px] w-full"
        >
          <img
            src={image}
            alt="ui/ux review check"
            className="h-full w-full object-cover object-center"
          />
        </CardHeader>
        <CardBody className="space-y-2 w-full">
          <Typography variant="h2" className="capitalize">
            {petName}
          </Typography>
          <span className="flex justify-between">
            {currentDonation > maxDonationAmount ? (
              <>
                <p className="font-semibold">Highest amount</p>
                <p className="text-red-500">${highestDonationAmount}</p>
              </>
            ) : (
              <>
                <p className="font-semibold">Max Donate amount</p>
                <p className="text-red-500">${maxDonationAmount}</p>
              </>
            )}
          </span>
          <span className="flex justify-between">
            <p className="font-semibold">Donated amount</p>
            <p className="text-green-500">${currentDonation}</p>
          </span>
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          {/* TODO: id will ne added on the path name */}
          <Link to={`/donation_details/${_id}`}>
            <Button color="dark" disabled={pause}>
              View Detail
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
DonationCard.propTypes = {
  donated: PropTypes.object,
  innerRef: PropTypes.node,
};
export default DonationCard;
