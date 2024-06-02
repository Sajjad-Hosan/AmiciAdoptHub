import { FaArrowRight } from "react-icons/fa6";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

const CommunityCard = ({ icon, heading, subHeading }) => {
  return (
    <Card className="mt-6 bg-[#005A55] text-white h-[370px]">
      <CardBody>
        <img src={icon} alt="" className="w-12 mb-5" />
        <Typography variant="h5" color="white" className="mb-2">
          {heading}
        </Typography>
        <Typography>{subHeading}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Button
            size="md"
            variant="text"
            color="white"
            className="flex items-center gap-2"
          >
            Learn More
            <FaArrowRight />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};
CommunityCard.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
export default CommunityCard;
