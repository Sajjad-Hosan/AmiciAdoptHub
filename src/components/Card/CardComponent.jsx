import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Badge, Button } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const CardComponent = ({ pet, innerRef }) => {
  const { _id, image, petName, petAge, petLocation } = pet;
  return (
    <Card
      ref={innerRef}
      shadow={false}
      className="relative grid h-[30rem] w-full items-end  overflow-hidden"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        style={{ backgroundImage: `url(${image || <Skeleton count={5} />})` }}
        className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center cursor-pointer transition transform duration-500 hover:scale-125`}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-4 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl text-white">
            {petName || <Skeleton count={5} />}
          </h1>
          <Badge
            color="gray"
            icon={FaLocationDot || <Skeleton count={5} />}
            className="px-4 py-2"
          >
            {petLocation || <Skeleton count={5} />}
          </Badge>
        </div>
        <p className="text-gray-300 font-semibold mb-4 ml-1">
          {petAge || <Skeleton count={5} />}
        </p>
        <Link to={`/pet_detail/${_id}`}>
          <Button>More About Burno</Button>
        </Link>
      </CardBody>
    </Card>
  );
};
CardComponent.propTypes = {
  pet: PropTypes.object,
  innerRef: PropTypes.node,
};
export default CardComponent;
