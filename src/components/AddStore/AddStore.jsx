import { Button, Modal } from "flowbite-react";
import PropTypes from "prop-types";
import { Input, Textarea } from "@material-tailwind/react";
import { FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "sonner";

const AddStore = ({ openModal, setOpenModal }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const today = new Date();
  const date = today.toDateString();
  const time = today.toLocaleTimeString();
  const imgbb_key = import.meta.env.VITE_IMG_KEY;
  const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;
  const handleStory = (e) => {
    console.log(e);
    //
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
      const info = {
        image: imageUrl,
        customerName: e.customerName,
        location: e.location,
        petName: e.petName,
        shortStory: e.shortStory,
        store: e.store,
        storyAddDate: date,
        storyAddTime: time
      };
      axiosSecure.post("/success_store", info).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          toast.success("Pet story added !");
        }
      });
    }
  };



  return (
    <>
      <Modal
        show={openModal}
        size="2xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div>
            <h1 className="text-2xl mb-4">Add Story</h1>
            <form
              className="space-y-4 p-4"
              onSubmit={handleSubmit(handleStory)}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <Input
                  variant="standard"
                  label="pet name"
                  placeholder="Standard"
                  {...register("petName", { required: true })}
                />
                <Input
                  variant="standard"
                  label="owner name"
                  placeholder="Standard"
                  {...register("customerName", { required: true })}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Input
                  variant="standard"
                  label="location"
                  placeholder="Standard"
                  {...register("location", { required: true })}
                />
                <FileInput id="file-upload" />
              </div>
              <Textarea
                variant="standard"
                label="short store"
                className="border-0 shadow-none"
                {...register("store")}
              />
              <Textarea
                variant="standard"
                label="Store"
                rows={6}
                className="border-0 shadow-none"
                {...register("shortStory")}
              />
              <Button type="submit">Add story</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
AddStore.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
};
export default AddStore;
