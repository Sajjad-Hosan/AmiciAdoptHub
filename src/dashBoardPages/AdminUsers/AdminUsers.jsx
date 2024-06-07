import PropTypes from "prop-types";
import { FaHouseUser } from "react-icons/fa6";
import { LuUserX } from "react-icons/lu";
import { FiUserCheck } from "react-icons/fi";
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
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
const TABLE_HEAD = ["#", "Image", "Name", "email", "", "Action"];
const AdminUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all_users/?email=${user?.email}`);
      return res.data;
    },
  });
  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make him admin ?",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, make him!",
    }).then((result) => {
      if (result.isConfirmed) {
        const info = {
          admin: true,
        };
        axiosSecure.patch(`/make_admin/${id}?mode=admin`, info).then((res) => {
          console.log(res.data);
          refetch();
        });
      }
    });
  };
  const handleBlockUser = (id, bool) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${bool ? "block" : "unblock"} him ?`,
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: `Yes, ${bool ? "block" : "unblock"} him!`,
    }).then((result) => {
      if (result.isConfirmed) {
        const info = {
          block: bool,
        };
        axiosSecure.patch(`/make_admin/${id}?mode=block`, info).then((res) => {
          console.log(res.data);
          refetch();
        });
      }
    });
  };
  return (
    <div className="md:p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Users</h1>
        <span className="py-3 px-6 border-2 border-gray-400 rounded-lg font-semibold">
          Users: {data.length < 10 ? `0${data.length}` : data.length}
        </span>
      </div>
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
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index} className={item.block ? "bg-gray-500" : ""}>
                      <td className={classes}>{index}</td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={item.image}
                            alt={item.name}
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
                          {item.name}
                        </Typography>
                      </td>
                      <td className={classes}>{item.email}</td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          |
                        </Typography>
                      </td>
                      <td className={`space-x-3 ${classes}`}>
                        {item.block ? (
                          ""
                        ) : (
                          <Tooltip content="make admin">
                            <IconButton
                              variant="text"
                              disabled={item?.admin}
                              onClick={() => handleMakeAdmin(item._id)}
                            >
                              <FaHouseUser className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {item.block ? (
                          <Tooltip content="unblock user">
                            <IconButton
                              variant="text"
                              onClick={() => handleBlockUser(item._id, false)}
                            >
                              <FiUserCheck className="h-5 w-5" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip content="block user">
                            <IconButton
                              variant="text"
                              onClick={() => handleBlockUser(item._id, true)}
                            >
                              <LuUserX className="h-5 w-5" />
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

export default AdminUsers;