import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
const RandomCard = () => {
  return (
    <>
      <Link>
        <Card
          shadow={false}
          className="relative grid h-[25rem] w-full max-w-[28rem] overflow-hidden"
        >
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center cursor-pointer transition-all duration-300 transform hover:scale-125"
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

export default RandomCard;
