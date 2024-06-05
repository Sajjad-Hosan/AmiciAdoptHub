import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import { Button } from "flowbite-react";
import { VscEdit } from "react-icons/vsc";

import { FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "react-router-dom";
import { ImGift } from "react-icons/im";
const PetUpdate = () => {
  const loaderData = useLoaderData();
  const {
    _id,
    image,
    petName,
    petAge,
    category,
    petLocation,
    petGender,
    petFee,
    petWeight,
    shortDescription,
    description,
    adopted,
    petAddDate,
    petAddTime,
    personEmail,
  } = loaderData;

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();
  const [img, setImg] = useState(image);
  const [select, setSelect] = useState(category);
  const [gender, setGender] = useState(petGender);
  const {
    handleSubmit,
    register,
    formState: { error },
  } = useForm();

  const imgbb_key = import.meta.env.VITE_IMG_KEY;
  const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

  const handleUpdatePet = async (pet) => {
    const imageFile = { image: pet.petImageFile[0] };
    // sending image to imgbb server my api
    const res = await axios.post(imgbb_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imageUrl = res.data?.data?.display_url;
    //
    if (res.data.success) {
      setImg(imageUrl);

      const petDetails = {
        image: imageUrl,
        petName: pet.petName,
        petAge: pet.petAge,
        category: select,
        petLocation: pet.petLocation,
        petGender: gender,
        petFee: parseInt(pet.petFee),
        petWeight: pet.petWeight,
        shortDescription: pet.shortDescription,
        description: pet.description,
        adopted: adopted,
        petAddDate: petAddDate,
        petAddTime: petAddTime,
      };
      // sending pet details to the database
      axiosSecure.patch(`/pet_update/${_id}`, petDetails).then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Pet detail add to database!");
          navigate(-1);
        } else {
          navigate(-1);
        }
      });
    }
  };
  return (
    <div className="md:p-10">
      <h1 className="text-3xl">Update {petName}</h1>
      <div className="flex flex-col-reverse items-center mt-10">
        <div className="mt-14 card p-5">
          <form
            className="md:w-[40rem] space-y-4"
            onSubmit={handleSubmit(handleUpdatePet)}
          >
            <FileInput
              id="file-upload"
              {...register("petImageFile")}
              error={error}
            />
            <div className="grid grid-cols-2 gap-10 w-full">
              <Input
                variant="standard"
                label="Pet name"
                defaultValue={petName}
                {...register("petName")}
                error={error}
              />
              <Input
                variant="standard"
                label="Pet age"
                defaultValue={petAge}
                {...register("petAge")}
                error={error}
              />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <Select
                variant="standard"
                label="Pet Category"
                value={select}
                onChange={(val) => setSelect(val)}
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
                defaultValue={petLocation}
                {...register("petLocation")}
              />
            </div>
            <div className="grid grid-cols-3 gap-10 w-full">
              <Select
                variant="standard"
                label="Pet gender"
                value={gender}
                onChange={(val) => setGender(val)}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
              <Input
                variant="standard"
                label="Pet weight"
                defaultValue={petWeight}
                {...register("petWeight")}
                error={error}
              />
              <Input
                variant="standard"
                label="Pet fee"
                defaultValue={petFee}
                {...register("petFee")}
                error={error}
              />
            </div>
            <div>
              <Textarea
                variant="standard"
                label="Short description"
                defaultValue={shortDescription}
                className="shadow-none border-0"
                rows={2}
                {...register("shortDescription")}
                error={error}
              />
            </div>
            <div>
              <Textarea
                variant="standard"
                label="Description"
                defaultValue={description}
                className="shadow-none border-0"
                rows={8}
                {...register("description")}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                <VscEdit className="mt-1 mr-3" /> Update Pet
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

export default PetUpdate;
