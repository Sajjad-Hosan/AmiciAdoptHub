import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const RandomCard = ({ detail }) => {
  return (
    <>
      <Link to={`/donation_page`}>
        <Card
          shadow={false}
          className="relative grid h-[25rem] w-full max-w-[28rem] overflow-hidden"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            style={{
              backgroundImage: `url(${detail.image})`,
            }}
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center cursor-pointer transition-all duration-300 transform hover:scale-125"
          >
            <div className="to-bg-black-10 absolute  z-20 h-full w-full bg-gradient-to-t from-black/80 via-black/50 transition duration-300 opacity-0 hover:opacity-60"></div>
          </CardHeader>
          <CardBody className="absolute bottom-2 left-4 py-2 px-2 md:px-2">
            <Typography
              variant="h2"
              color="white"
              className="mb-6 font-medium leading-[1.5]"
            >
              Burno
            </Typography>
          </CardBody>
        </Card>
      </Link>
    </>
  );
};
RandomCard.propTypes = {
  detail: PropTypes.object,
};
export default RandomCard;
