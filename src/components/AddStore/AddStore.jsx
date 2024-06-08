import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";
import { Input, Textarea } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
const AddStore = ({ openModal, setOpenModal }) => {
  const { register, handleSubmit } = useForm();
  const handleStorie = (e) => {
    console.log(e);
  };
  return (
    <>
      <Modal show={openModal} size="2xl" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div>
            <h1 className="text-2xl mb-4">Add Storie</h1>
            <form
              className="space-y-3 p-4"
              onSubmit={handleSubmit(handleStorie)}
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
                <input
                  type="date"
                  name=""
                  id=""
                  className="border-0 shadow-none datePicker"
                />
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
