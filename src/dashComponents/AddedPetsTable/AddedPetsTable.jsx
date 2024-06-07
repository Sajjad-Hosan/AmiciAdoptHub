import PropTypes from "prop-types";
import {
  PencilIcon,
  CheckCircleIcon,
  TrashIcon,
  XMarkIcon,
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
import { Badge } from "flowbite-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const TABLE_HEAD = ["#", "Image", "Name", "Category", "Status", "Action"];

const AddedPetsTable = ({ myPets, petRef }) => {
  const axiosSecure = useAxiosSecure();

  const handleAdopted = (bool, item) => {
    // update some proparty
    const update = {
      adopted: bool,
    };
    axiosSecure.patch(`/update_pet_status/${item._id}`, update).then((res) => {
      console.log("update", res.data);
      petRef();
    });
  };
  const handleDelete = (id) => {
    axiosSecure.delete(`/pet_delete/${id}`).then((res) => {
      if (res.data.deletedCount) {
        toast.success("Pet info has been deleted!");
        petRef();
      }
    });
  };
  return (
    <>
      <Card className="h-full w-full shadow-none">
        <CardBody className="overflow-scroll px-0">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="cursor-pointer border-y py-4 px-6">
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
              {myPets?.map((item, index) => {
                const isLast = index === myPets.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>{index}</td>
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
                    <td className={classes}>category</td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.adopted ? (
                          <Badge className="py-3 capitalize" color="green">
                            adopted
                          </Badge>
                        ) : (
                          <Badge className="py-3 capitalize" color="red">
                            not adopted
                          </Badge>
                        )}
                      </Typography>
                    </td>
                    <td className={`space-x-3 ${classes}`}>
                      <Tooltip content="Edit Pet">
                        <Link to={`/dashboard/pet_update/${item._id}`}>
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip content="Delete Pet">
                        <IconButton
                          variant="text"
                          onClick={() => handleDelete(item._id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      {item.adopted ? (
                        <Tooltip content="Alert">
                          <IconButton
                            variant="text"
                            onClick={() => handleAdopted(false, item)}
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip content="Adopted">
                          <IconButton
                            variant="text"
                            onClick={() => handleAdopted(true, item)}
                          >
                            <CheckCircleIcon className="h-4 w-4" />
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
        {myPets.length < 10 ? (
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
    </>
  );
};
AddedPetsTable.propTypes = {
  myPets: PropTypes.array,
};
export default AddedPetsTable;
