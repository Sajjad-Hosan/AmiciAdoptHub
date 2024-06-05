import PropTypes from "prop-types";
import {
  PencilIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
  Progress,
} from "@material-tailwind/react";
const TABLE_HEAD = [
  "#",
  "Image",
  "Name",
  "Max Donation",
  "Current Donation",
  "Action",
];

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { VscEmptyWindow } from "react-icons/vsc";
import DonationViewModal from "../DonationViewModal/DonationViewModal";
import { useState } from "react";
import Swal from "sweetalert2";
import { Badge } from "flowbite-react";

const DonationCampaigns = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const axiosSecure = useAxiosSecure();
  //   const [open, setOpen] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/donation_campaign?email=${user?.email}`);
      return res.data;
    },
  });
  const handleModal = (bool, name) => {
    setName(name);
    setOpen(bool);
  };
  const handlePlay = (id) => {
    Swal.fire({
      title: "Are you sure to open it?",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, open it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const info = {
          pause: false,
        };
        axiosSecure.patch(`/donation_update_status/${id}`, info).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            Swal.fire({
              text: "The donation has been opened!",
              position: "top-right",
              timer: 1200,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      }
    });
  };
  const handlePause = (id) => {
    Swal.fire({
      title: "Are you sure to pause it?",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, pause it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const info = {
          pause: true,
        };
        axiosSecure.patch(`/donation_update_status/${id}`, info).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount) {
            Swal.fire({
              text: "The donation has been paused!",
              position: "top-right",
              timer: 1200,
              showConfirmButton: false,
            });
          }
          refetch();
        });
      }
    });
  };
  return (
    <>
      <DonationViewModal openModal={open} setOpenModal={setOpen} name={name} />
      {/* ---------------------------------------------------- */}
      <div className="md:p-10">
        <h1 className="text-3xl">My Donation Campaigns</h1>
        <div className="mt-6 flex justify-between gap-20">
          <div className="md:w-72">
            <Input variant="standard" label="Search here" className="w-full" />
          </div>
          <div className="flex gap-8 items-center">
            <Link to="/dashboard/create_campaign">
              <Button variant="outlined" className="flex items-center gap-3">
                <VscEmptyWindow /> Create Donation
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <Card className="h-full w-full shadow-none">
            <CardBody className="overflow-scroll px-0">
              <table className="w-full table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="cursor-pointer border-y py-4 px-6"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                          {head}{" "}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data?.map(
                    (
                      {
                        _id,
                        image,
                        petName,
                        currentDonation,
                        maxDonationAmount,
                        pause,
                      },
                      index
                    ) => {
                      const isLast = index === data.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr
                          key={index}
                          className={
                            pause ? "bg-red-300 cursor-not-allowed" : ""
                          }
                        >
                          <td className={classes}>{index}</td>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <Avatar
                                src={image}
                                alt={petName}
                                size="md"
                                variant="rounded"
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {petName}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {maxDonationAmount} $
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Progress
                              value={
                                (currentDonation / maxDonationAmount) * 100
                              }
                              variant="filled"
                              color="indigo"
                            />
                          </td>
                          <td className={`space-x-3 ${classes}`}>
                            {pause ? (
                              ""
                            ) : (
                              <Tooltip content="edit">
                                <Link to={`/dashboard/campaign_update/${_id}`}>
                                  <IconButton variant="text">
                                    <PencilIcon className="h-4 w-4" />
                                  </IconButton>
                                </Link>
                              </Tooltip>
                            )}
                            {pause ? (
                              <Tooltip content="Open">
                                <IconButton
                                  variant="text"
                                  onClick={() => handlePlay(_id)}
                                >
                                  <PauseCircleIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            ) : (
                              <Tooltip content="Close">
                                <IconButton
                                  variant="text"
                                  onClick={() => handlePause(_id)}
                                >
                                  <PlayCircleIcon className="h-4 w-4" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <Tooltip content="view">
                              <IconButton
                                disabled={pause}
                                variant="text"
                                onClick={() => handleModal(true, petName)}
                              >
                                <ViewfinderCircleIcon className="h-4 w-4" />
                              </IconButton>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            {/* {myPets.length < 10 ? (
          ""
        ) : (
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        )} */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default DonationCampaigns;
