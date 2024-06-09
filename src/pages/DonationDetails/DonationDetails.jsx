import { Button } from "flowbite-react";
import {
  List,
  ListItem,
  ListItemSuffix,
  Chip,
  Card,
  Progress,
  Typography,
} from "@material-tailwind/react";
import { FaDonate } from "react-icons/fa";
import DonationRandom from "../../components/DonationRandom/DonationRandom";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
const DonationDetails = () => {
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const { data = [], refetch } = useQuery({
    queryKey: ["donations_details"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation_info/${params.id}`);
      return res.data;
    },
  });
  const {
    petName,
    image,
    currentDonation,
    maxDonationAmount,
    highestDonationAmount,
    description,
    lastDate,
    pause,
  } = data;
  return (
    <>
      <Helmet>
        <title>Donation Detail | AmiciAdoptHub</title>
      </Helmet>
      <PaymentModal
        open={openModal}
        setOpen={setOpenModal}
        pet={data}
        refetch={refetch}
      />
      <div className="p-5 md:p-10 mt-10">
        <div className="fixed top-0 left-0 -z-10 w-full h-full">
          <img src={image} alt="" className="w-full h-full" />
        </div>
        <div className="h-[30rem] bg-none p-10 flex flex-col items-center justify-center gap-4 rounded-3xl text-white">
          <h1 className="text-5xl text-center capitalize">Help {petName}</h1>
          <h2 className="text-2xl capitalize">
            Give him/her a Brighter Future
          </h2>
          <p className="text-center">
            Every pet deserves a loving home, proper care, and a chance to
            thrive. Your generous donation helps us provide essential services
            such as shelter, food, medical care, and adoption programs for
            homeless and abandoned animals. Join us in making a difference in
            the lives of these wonderful companions. Donate today and be a hero
            for pets in need!
          </p>
        </div>
        <div className=" bg-none rounded-2xl mt-32 p-5 md:p-10 flex flex-col md:flex-row justify-between text-white">
          <div className="md:w-3/4 rounded-2xl shadow h-3/4 overflow-hidden">
            <img className="h-full w-full object-cover" src={image} alt="" />
          </div>
          <div className="px-4 md:px-14 py-10 w-full space-y-3 relative">
            <div className="flex justify-between items-center gap-2">
              <h1 className="text-5xl">{petName}</h1>
              <span className="border px-6 py-2 font-semibold rounded-lg">
                {lastDate}
              </span>
            </div>
            <p className="text-white dark:text-base-200 pl-1">{description}</p>
            <Card className="bg-transparent border shadow-none md:w-3/4">
              <List>
                <ListItem>
                  <div className="w-full">
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <Typography variant="p">Completed</Typography>
                      <Typography variant="p">
                        {currentDonation > maxDonationAmount
                          ? (currentDonation / highestDonationAmount).toFixed(
                              3
                            ) * 100
                          : (currentDonation / maxDonationAmount) * 100}
                        %
                      </Typography>
                    </div>
                    {currentDonation > maxDonationAmount ? (
                      <Progress
                        color="indigo"
                        value={(currentDonation / highestDonationAmount) * 100}
                      />
                    ) : (
                      <Progress
                        value={(currentDonation / maxDonationAmount) * 100}
                      />
                    )}
                  </div>
                </ListItem>
                <ListItem className="text-white">
                  Current Donation
                  <ListItemSuffix>
                    <Chip
                      value={currentDonation}
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
                <ListItem
                  className={`text-white ${
                    currentDonation > maxDonationAmount ? "bg-green-600" : ""
                  }`}
                >
                  Max Donation
                  <ListItemSuffix>
                    <Chip
                      value={maxDonationAmount}
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
                <ListItem className="text-white">
                  Highest Donation
                  <ListItemSuffix>
                    <Chip
                      value={highestDonationAmount}
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                    />
                  </ListItemSuffix>
                </ListItem>
              </List>
            </Card>
            <div className="flex justify-end">
              <Button
                color="dark"
                onClick={() => setOpenModal(true)}
                disabled={pause || currentDonation > highestDonationAmount}
              >
                <FaDonate className="mr-2 text-xl" />
                Donate now
              </Button>
            </div>
          </div>
        </div>
        {/* ALERT: this compoent will show more need donation cards randomly */}
        <DonationRandom />
      </div>
    </>
  );
};

export default DonationDetails;
