import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import StoriesCard from "../StoriesCard/StoriesCard";
import { MdOutlinePets } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
import AddStore from "../AddStore/AddStore";
const CallToAction = () => {
  const [openModal, setOpenModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const res = await axiosSecure.get("/success_stores");
      return res.data;
    },
  });
  return (
    <>
      <AddStore openModal={openModal} setOpenModal={setOpenModal} />
      <div className="my-20 md:px-10">
        <h1 className="text-3xl text-center md:w-1/2 mx-auto">
          From Shelter to Forever Home Our Success Stories
        </h1>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {data.slice(0, 3).map((store) => (
            <StoriesCard key={store._id} story={store} />
          ))}
        </div>
        <div className="flex gap-5 mt-8 justify-end">
          <button className="btn px-6 btn-outline">See Available Pets</button>
          <button className="btn px-6 btn-neutral">
            Adopt Pet <MdOutlinePets />
          </button>
          <button
            className="btn px-6 btn-neutral"
            onClick={() => setOpenModal(true)}
          >
            Add Pet Story <LuPlus />
          </button>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
