import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import { Badge, Button } from "flowbite-react";
import { FaLocationDot } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardComponent = ({ pet }) => {
  return (
    <Card
      shadow={false}
      className="relative grid h-[30rem] w-full items-end  overflow-hidden"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/happy-dog-running-in-yard-2022-06-07-22-50-40-utc.jpg')] bg-cover bg-center cursor-pointer transition transform duration-500 hover:scale-125"
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-4 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl text-white">Burno</h1>
          <Badge color="gray" icon={FaLocationDot} className="px-4 py-2">
            Cacilo Cat
          </Badge>
        </div>
        <p className="text-gray-300 font-semibold mb-4 ml-1">6 month</p>
        <Link to={"/pet_detail"}>
          <Button>More About Burno</Button>
        </Link>
      </CardBody>
    </Card>
  );
};
CardComponent.propTypes = {
  pet: PropTypes.object,
};
export default CardComponent;
