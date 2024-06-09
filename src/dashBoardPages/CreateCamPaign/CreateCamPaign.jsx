import { Input, Textarea, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { FileInput } from "flowbite-react";
import { VscAdd } from "react-icons/vsc";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const CreateCamPaign = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();
  const [last, setLast] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const imgbb_key = import.meta.env.VITE_IMG_KEY;
  const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;
  const handleDateChange = (d) => {
    setLast(d.target.value);
  };
  const handleCreateCampaign = async (i) => {
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
        maxDonationAmount: parseFloat(i.maxAmount),
        highestDonationAmount: parseFloat(i.highestAmount),
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
      axiosSecure.post("/create_campaign", camping).then((res) => {
        if (res.data.warn) {
          reset();
          return toast.warning(res.data.warn);
        }
        if (res.data.insertedId) {
          toast.success("The donation campaign has been create!");
          reset();
        }
      });
    }
  };

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-3xl">Create Your Donation Campaign</h1>
      <div className="mt-16">
        <form
          className="mt-10 md:w-4/5 mx-auto min-h-screen space-y-5"
          onSubmit={handleSubmit(handleCreateCampaign)}
        >
          <FileInput
            id="file-upload"
            className="md:w-1/2 mx-auto"
            {...register("image", { required: true })}
          />
          <div className="grid grid-cols-2 gap-10">
            <Input
              variant="standard"
              label="Pet Name"
              placeholder="name"
              {...register("petName", { required: true })}
            />
            <input
              type="date"
              onChange={handleDateChange}
              className="shadow-none border-0 datePicker"
            />
          </div>
          <div className="grid grid-cols-2 gap-10">
            <Input
              variant="standard"
              label="Max Donation"
              placeholder="amount"
              {...register("maxAmount", { required: true })}
            />
            <Input
              variant="standard"
              label="Highest Donation"
              placeholder="amount"
              {...register("highestAmount", { required: true })}
            />
          </div>
          <Textarea
            variant="standard"
            label="Short description"
            className="shadow-none border-0"
            {...register("shortDescription", { required: true })}
          />
          <Textarea
            variant="standard"
            label="Description"
            rows={5}
            className="shadow-none border-0"
            {...register("description", { required: true })}
          />
          <Button
            variant="outlined"
            className="flex items-center gap-3"
            type="submit"
          >
            <VscAdd /> Add donation campaign
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCamPaign;
