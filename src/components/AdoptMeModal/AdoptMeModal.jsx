import { Card, CardHeader } from "@material-tailwind/react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import useLoading from "../../hooks/useLoading";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdoptMeModal = ({ open, setOpen, pet }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { _id, image, petName } = pet;
  const [loading, setLoading] = useLoading();
  const handleClicks = (bool) => {
    setLoading(true);
    setOpen(bool);
  };
  const handleAdoptMe = (i) => {
    const petAdopt = {
      petId: _id,
      petName: petName,
      adoption: false,
      image: image,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhone: i.userPhone,
      userAddress: i.userAddress,
    };
    // send adoptdata to database
    axiosSecure.post("/pet_adopt_me", petAdopt).then((res) => {
      if (res.data.warn) {
        reset();
        navigate(-1);
        return toast.warning(res.data.warn);
      }
      if (res.data.insertedId) {
        toast.success("Pet has been adopted!");
        navigate(-1);
        reset();
      }
    });
  };
  return (
    <div>
      <Modal
        dismissible
        show={open}
        onClose={() => handleClicks(false)}
        size="5xl"
        popup
        className="z-50"
      >
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <Modal.Header className="p-6">{petName}</Modal.Header>
            <div className="md:p-8 overflow-y-scroll">
              <Modal.Body className="flex flex-col-reverse md:flex-row gap-10 items-center">
                <form
                  className="flex flex-col gap-4 w-full"
                  onSubmit={handleSubmit(handleAdoptMe)}
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-2 block">
                        <Label value="Pet Id" />
                      </div>
                      <TextInput type="text" value={_id} readOnly />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Pet Name" />
                      </div>
                      <TextInput type="text" value={petName} readOnly />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-2 block">
                        <Label value="Name" />
                      </div>
                      <TextInput type="text" defaultValue={user?.displayName} />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Email" />
                      </div>
                      <TextInput type="text" defaultValue={user?.email} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-2 block">
                        <Label value="Phone Number" />
                      </div>
                      <TextInput
                        type="text"
                        placeholder="phone number"
                        {...register("userPhone", { required: true })}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Address" />
                      </div>
                      <TextInput
                        type="text"
                        placeholder="address"
                        {...register("userAddress", { required: true })}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button type="submit" color="dark" className="px-10">
                      Adopt Me
                    </Button>
                  </div>
                </form>
                <Card className="w-96 p-2 mb-4">
                  <CardHeader floated={false} className="">
                    <img src={image} alt={image} />
                  </CardHeader>
                </Card>
              </Modal.Body>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};
AdoptMeModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  pet: PropTypes.object,
};
export default AdoptMeModal;
