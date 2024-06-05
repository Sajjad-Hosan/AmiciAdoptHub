import { useLoaderData, useNavigate } from "react-router-dom";
import { Input, Textarea, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FileInput } from "flowbite-react";
import { VscArrowLeft, VscEdit } from "react-icons/vsc";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "sonner";

const CampaignUpdate = () => {
  const loaderData = useLoaderData();
  const {
    _id,
    petName,
    image,
    maxDonationAmount,
    highestDonationAmount,
    shortDescription,
    description,
    lastDate,
    userName,
    userEmail,
    createDate,
    createTime,
    pause,
  } = loaderData;
  //   -----------------------------------------------
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();
  const [last, setLast] = useState("");
  const { register, handleSubmit } = useForm();

  const imgbb_key = import.meta.env.VITE_IMG_KEY;
  const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;
  const handleDateChange = (d) => {
    setLast(d.target.value);
  };
  const handleUpdateCampaign = async (i) => {
    const imageFile = { image: i.image[0] };
    // sending image to imgbb server my api
    const res = await axios.post(imgbb_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imageUrl = res.data?.data?.display_url;
    //
    if (res.data.success) {
      const camping = {
        petName: i.petName,
        image: imageUrl,
        currentDonation: parseInt(0),
        maxDonationAmount: i.maxAmount,
        highestDonationAmount: i.highestAmount,
        shortDescription: i.shortDescription,
        description: i.description,
        lastDate: last,
        pause: false,
        userName: user?.displayName,
        userEmail: user?.email,
        createDate: date,
        createTime: time,
      };
      //   send camping to the database
      axiosSecure.patch(`/donation_update/${_id}`, camping).then((res) => {
        if (res.data.modifiedCount) {
          navigate(-1);
          return toast.success("The donation campaign has been updated!");
        }
        if (res.data.matchedCount) {
          navigate(-1);
          toast.warning("The donation campaign has already updated");
        }
      });
    }
  };
  return (
    <div className="md:p-10">
      <Button
        className="flex items-center gap-3 mb-3"
        onClick={() => navigate(-1)}
      >
        <VscArrowLeft /> Back
      </Button>
      <div className="mt-10">
        <h1 className="text-2xl">Update campaign</h1>
        <div className="flex flex-col gap-14 mt-14">
          <div className="card overflow-hidden h-96 w-[500px] mx-auto">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>
          <form
            className="md:w-4/5 mx-auto min-h-screen space-y-5"
            onSubmit={handleSubmit(handleUpdateCampaign)}
          >
            <FileInput
              id="file-upload"
              {...register("image", { required: true })}
            />
            <div className="grid grid-cols-2 gap-10">
              <Input
                variant="standard"
                label="Pet Name"
                placeholder="name"
                defaultValue={petName}
                {...register("petName", { required: true })}
              />
              <input
                type="date"
                onChange={handleDateChange}
                defaultValue={lastDate}
                className="shadow-none border-0 datePicker"
              />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <Input
                variant="standard"
                label="Max Donation"
                placeholder="amount"
                defaultValue={maxDonationAmount}
                {...register("maxAmount", { required: true })}
              />
              <Input
                variant="standard"
                label="Highest Donation"
                placeholder="amount"
                defaultValue={highestDonationAmount}
                {...register("highestAmount", { required: true })}
              />
            </div>
            <Textarea
              variant="standard"
              label="Short description"
              defaultValue={shortDescription}
              className="shadow-none border-0"
              {...register("shortDescription", { required: true })}
            />
            <Textarea
              variant="standard"
              label="Description"
              rows={5}
              defaultValue={description}
              className="shadow-none border-0"
              {...register("description", { required: true })}
            />
            <Button
              variant="outlined"
              className="flex items-center gap-3"
              type="submit"
            >
              <VscEdit /> Update donation campaign
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignUpdate;
