import PropTypes from "prop-types";
import { ArrowUturnRightIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "flowbite-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TABLE_HEAD = ["#", "Image", "Name", "Amount", "Action"];
const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = [], refetch } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user?.email}`);
      return res.data;
    },
  });
  //
  const handleAmount = async (id, amount) => {
    if (amount > 0) {
      const info = {
        currentAmount: amount,
        petId: id,
      };
      const res = await axiosSecure.patch(
        `/donation_amount/${id}?status=${true}`,
        info
      );
      if (res.data.deleteRE?.deletedCount) {
        refetch();
      } else {
        refetch();
      }
    }
  };
  return (
    <div className="md:p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">See where have you donated</h1>
        <Badge
          color="gray"
          className="px-8 py-3 rounded-lg bg-base-300"
          size="lg"
        >
          Donated: {data.length}
        </Badge>
      </div>
      <div className="mt-8">
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
                        //   color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map(({ petId, image, petName, amount }, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
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
                      <td className={classes}>{amount}$</td>
                      <td className={`space-x-3 ${classes}`}>
                        <Tooltip content="Refund">
                          <IconButton
                            variant="text"
                            onClick={() => handleAmount(petId, amount)}
                          >
                            <ArrowUturnRightIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          {data.length < 10 ? (
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
          )}
        </Card>
      </div>
    </div>
  );
};

export default MyDonations;