import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import { Button } from "flowbite-react";
import { VscAdd } from "react-icons/vsc";
import imgpic from "../../assets/Authen/doggy_login.svg";

import { FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

const AddPet = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();
  const [img, setImg] = useState(imgpic);
  const {
    handleSubmit,
    register,
    formState: { error },
    reset,
  } = useForm();

  const imgbb_key = import.meta.env.VITE_IMG_KEY;
  const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

  const handleAddPet = async (pet) => {
    const imageFile = { image: pet.petImageFile[0] };
    // sending image to imgbb server my api
    const res = await axios.post(imgbb_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imageUrl = res.data?.data?.display_url;
    console.log(res.data.success);
    //
    if (res.data.success) {
      setImg(imageUrl);

      const petDetails = {
        image: imageUrl,
        petName: pet.petName,
        petAge: pet.petAge,
        category: pet.petCategory,
        petLocation: pet.petLocation,
        shortDescription: pet.shortDescription,
        description: pet.description,
        adopted: false,
        petAddDate: date,
        petAddTime: time,
        personName: user?.displaName,
        personEmail: user?.email,
      };
      // sending pet details to the database
      axiosSecure.post("/add_Pet", petDetails).then((res) => {
        if (res.data.insertedId) {
          toast.success("Pet detail add to database!");
          reset();
        }
      });
    }
  };
  return (
    <div className="md:p-10">
      <h1 className="text-3xl">Add Pet Page</h1>
      <div className="flex flex-col-reverse items-center mt-10">
        <div className="mt-14 card p-5">
          <form
            className="md:w-[35rem] space-y-4"
            onSubmit={handleSubmit(handleAddPet)}
          >
            <FileInput
              id="file-upload"
              {...register("petImageFile", { required: false })}
            />
            <div className="grid grid-cols-2 gap-10 w-full">
              <Input
                variant="standard"
                label="Pet name"
                {...register("petName", { required: false })}
              />
              <Input
                variant="standard"
                label="Pet age"
                {...register("petAge", { required: false })}
              />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <Select
                variant="standard"
                label="Pet Category"
                {...register("petCategory", { required: false })}
              >
                <Option value="dog">Dog</Option>
                <Option value="cat">Cat</Option>
                <Option value="rabbit">Rabbit</Option>
                <Option value="fish">Fish</Option>
                <Option disabled>Coming soon</Option>
              </Select>
              <Input
                variant="standard"
                label="Pet location"
                {...register("petLocation", { required: false })}
              />
            </div>
            <div>
              <Textarea
                variant="standard"
                label="Short description"
                className="shadow-none border-0"
                rows={2}
                {...register("shortDescription", { required: false })}
              />
            </div>
            <div>
              <Textarea
                variant="standard"
                label="Description"
                className="shadow-none border-0"
                rows={8}
                {...register("description")}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                <VscAdd className="mt-1 mr-3" /> Add New Member
              </Button>
            </div>
          </form>
        </div>
        <div className="w-1/2 h-1/2 card border p-5 overflow-hidden">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AddPet;
