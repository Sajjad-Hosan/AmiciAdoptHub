import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Button } from "flowbite-react";
const DonationCard = () => {
  return (
    <div>
      <Card className="max-w-[24rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody className="space-y-2">
          <Typography variant="h2" color="blue-gray">
            Burno
          </Typography>
         <span className="flex justify-between">
            <p className="font-semibold">Max Donate amount</p>
            <p className="text-red-500">$12000</p>
         </span>
         <span className="flex justify-between">
            <p className="font-semibold">Donated amount</p>
            <p className="text-green-500">$8000</p>
         </span>
        </CardBody>
        <CardFooter className="flex items-center justify-end">
          <Button color='dark'>View Detail</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DonationCard;
