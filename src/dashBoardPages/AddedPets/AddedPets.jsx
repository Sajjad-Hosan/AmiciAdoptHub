import { Input, Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const AddedPets = () => {
  const { user } = useAuth();
  const axiosSrcure = useAxiosSecure();
  const { data: myPets,refetch:petRef } = useQuery({
    queryKey: ["pets", user?.email],
    queryFn: async () => {
      const res = await axiosSrcure(`/user_pets?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(myPets)
  return (
    <div className="p-5 md:p-10 mx-auto">
      <h1 className="text-3xl">My Added Pets</h1>
      <div className="mt-10 flex justify-between gap-20">
        <div className="md:w-72">
          <Input variant="standard" label="Search here" className="w-full" />
        </div>
        <div className="md:w-64">
          <Select variant="standard" label="Select Version" className="w-full">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>
      </div>
      <div className="mt-20">
        
      </div>
    </div>
  );
};

export default AddedPets;
