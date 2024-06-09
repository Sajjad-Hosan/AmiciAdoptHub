import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
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
} from "@material-tailwind/react";
import { toast } from "sonner";
import { useState } from "react";
const TABLE_HEAD = [
  "#",
  "Image",
  "Pet Name",
  "Name",
  "Email",
  "Phone",
  "Location",
  "Action",
];

const AdoptedRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [info, setInfo] = useState(false);
  const { data = [], refetch } = useQuery({
    queryKey: [user?.email, "adoption"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adoption_pets?email=${user?.email}`);
      return res.data;
    },
  });

  const handleAdoption = (adopted, id) => {
    // --------------------------
    axiosSecure
      .patch(`/adoption_status/${id}`, {
        adoption: adopted,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.info.adoption) {
          toast.success("You have adopted this pet!");
          refetch();
          return;
        }
        toast.success("You have remove this pet!");
        refetch();
      });
  };
  return (
    <div className="p-5 md:p-10">
      <h1 className="text-3xl">My Adoption Request</h1>
      <div className="mt-10">
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
                        //
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={index}
                      className={`${item.adoption ? "bg-gray-300" : ""}`}
                    >
                      <td className={classes}>{index}</td>
                      <td className={classes}>
                        <Avatar src={item.image} alt="avatar" size="lg" />
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {item.petName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {item.userName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {item.userEmail}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {item.userPhone}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {" "}
                        <Typography variant="small" className="font-normal">
                          {item.userAddress}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {item.adoption ? (
                          <Tooltip content="reject">
                            <IconButton
                              variant="text"
                              onClick={() => handleAdoption(false, item._id)}
                            >
                              <ArchiveBoxXMarkIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip content="accept">
                            <IconButton
                              variant="text"
                              onClick={() => handleAdoption(true, item._id)}
                            >
                              <ArchiveBoxArrowDownIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        )}
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
              <Typography variant="small" className="font-normal">
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
export default AdoptedRequest;
