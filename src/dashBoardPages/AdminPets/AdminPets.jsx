import { PiTrashBold } from "react-icons/pi";
import { LuPenSquare } from "react-icons/lu";
import { CgBlock, CgUnblock } from "react-icons/cg";
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
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useCallback, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
const TABLE_HEAD = ["#", "Image", "Name", "email", "", "Action"];
const AdminPets = () => {
  const loader = useLoaderData();
  const axiosSecure = useAxiosSecure();
  //
  const [data, setData] = useState([]);
  const [count] = useState(loader.count);
  const [current, setCurrent] = useState(0);
  const numberOfPages = Math.ceil(count / 10);
  const fetchData = useCallback(() => {
    axiosSecure.post(`/pets?page=${current}&mode=admin`).then((res) => {
      setData(res.data);
    });
  }, [axiosSecure, current]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleAdopted = (bool, id) => {
    // update some proparty
    const update = {
      adopted: bool,
    };
    axiosSecure.patch(`/update_pet_status/${id}`, update).then((res) => {
      console.log("update", res.data);
      fetchData();
    });
  };
  const handleDelete = (id) => {
    axiosSecure.delete(`/pet_delete/${id}`).then((res) => {
      if (res.data.deletedCount) {
        toast.success("Pet info has been deleted!");
      }
    });
  };

  return (
    <div className="md:p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Pets</h1>
        <span className="py-3 px-6 border-2 border-gray-400 rounded-lg font-semibold">
          Pets: {count.length < 10 ? `0${count}` : count}
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
                  console.log(item._id);
                  const isLast = index === data.length;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      key={index}
                      className={item.adopted ? "bg-gray-200" : ""}
                    >
                      <td className={classes}>{index + 1}</td>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={item.image}
                            alt={item.petName}
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
                          {item.petName}
                        </Typography>
                      </td>
                      <td className={classes}>{item.category}</td>
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
                        <Tooltip content="delete">
                          <IconButton
                            variant="text"
                            onClick={() => handleDelete(item._id)}
                          >
                            <PiTrashBold className="text-xl" />
                          </IconButton>
                        </Tooltip>

                        <Link to={`/dashboard/pet_update/${item._id}`}>
                          <Tooltip content="update">
                            <IconButton variant="text">
                              <LuPenSquare className="text-xl" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        {item.adopted ? (
                          <Tooltip content="unAdopted" className="bg-green-600">
                            <IconButton
                              variant="text"
                              onClick={() => handleAdopted(false, item._id)}
                            >
                              <CgUnblock className="text-xl" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip content="adopted" className="bg-red-500">
                            <IconButton
                              variant="text"
                              onClick={() => handleAdopted(true, item._id)}
                            >
                              <CgBlock className="text-xl" />
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
          {data.length < 1 ? (
            ""
          ) : (
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                Page {current} of {numberOfPages - 1}
              </Typography>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setCurrent((val) => val - 1)}
                  disabled={current <= 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={() => setCurrent((val) => val + 1)}
                  disabled={numberOfPages <= current}
                >
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

export default AdminPets;
