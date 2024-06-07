import { useState } from "react";
import { Modal, FileInput, Label } from "flowbite-react";
import { RiImageAddLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useForm } from "react-hook-form";
const ImageModal = ({ openModal, setOpenModal }) => {
  const { isImage, setIsImage } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const imgbb_key = import.meta.env.VITE_IMG_KEY;
  const imgbb_url = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;
  const {
    data = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user_images");
      return res.data;
    },
  });
  const handleSelect = (url, index) => {
    console.log(url, index);
    setImage(index);
    setIsImage(url);
    setOpenModal(false);
  };
  const handleAddImage = async (log) => {
    console.log(log.image[0]);
    const imageFile = { image: log.image[0] };

    // // sending image to imgbb server my api
    const res = await axios.post(imgbb_url, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const imageUrl = res.data?.data?.display_url;
      //
      const info = {
        id: data.length + 1,
        url: imageUrl,
      };
      axiosSecure.post("/add_user_picture", info).then((res) => {
        console.log(res.data);
        refetch();
      });
    }
  };
  const active = "scale-110 border-2 border-gray-800";
  const pending = "hover:scale-110 hover:border-2 hover:border-gray-800";
  return (
    <>
      <Modal
        show={openModal}
        size="2xl"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header className="px-8 pt-5">
          <Typography variant="h6" className="capitalize">
            choose your profile picture
          </Typography>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="text-center relative p-4">
              <div className="overflow-scroll">
                <div className="p-5 grid grid-cols-4 gap-5">
                  {data.map((item, i) => (
                    <div
                      className={`h-28 transition-all transform duration-200 cursor-pointer rounded-lg overflow-hidden ${
                        image === i ? active : pending
                      }`}
                      onClick={() => handleSelect(item.url, i)}
                      key={i}
                    >
                      <img
                        src={item.url}
                        alt={item.id}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Typography variant="h6" className="mr-8 capitalize">
            or choses your own picture
          </Typography>
          <div className="flex justify-center gap-4">
            <Label
              htmlFor="file-upload"
              className="tooltip"
              data-tip="add image"
              value={
                <RiImageAddLine className="text-2xl cursor-pointer transition-all transform duration-100 hover:scale-125" />
              }
            />
            <form onChange={handleSubmit(handleAddImage)}>
              <FileInput
                id="file-upload"
                className="hidden"
                {...register("image")}
              />
            </form>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
ImageModal.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
};
export default ImageModal;
