import { Input, Option, Select } from "@material-tailwind/react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import AddedPetsTable from "../../dashComponents/AddedPetsTable/AddedPetsTable";
import { VscAdd } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const AddedPets = () => {
  const { user } = useAuth();
  const axiosSrcure = useAxiosSecure();
  const {
    data: myPets,
    refetch: petRef,
    isLoading,
  } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      const res = await axiosSrcure(`/user_pets?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="p-5 md:p-6 mx-auto">
      <h1 className="text-3xl">My Added Pets</h1>
      <div className="flex my-3 justify-end">
        <Link to="/dashboard/add_pet">
          <button className="btn btn-outline px-8">
            <VscAdd /> Add Pet
          </button>
        </Link>
      </div>
      <div className="mt-6 flex justify-between gap-20">
        <div className="md:w-72">
          <Input variant="standard" label="Search here" className="w-full" />
        </div>
        <div className="md:w-64">
          <Select variant="standard" label="Sort by" className="w-full">
            <Option value="name">Name</Option>
            <Option value="age">Age</Option>
            <Option value="time">Time</Option>
            <Option value="date">Date</Option>
            <Option disabled>Coming soon</Option>
          </Select>
        </div>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div className="w-full flex items-center justify-center h-[20rem]">
            <Spinner className="h-10 w-10" />
          </div>
        ) : (
          <AddedPetsTable myPets={myPets} petRef={petRef} />
        )}
      </div>
    </div>
  );
};

export default AddedPets;
