import { FaLocationArrow, FaXmark } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Button, Card, Table } from "flowbite-react";
import useLoading from "../../hooks/useLoading";
import { useState } from "react";
import AdoptMeModal from "../AdoptMeModal/AdoptMeModal";
import { Link } from "react-router-dom";

const SliderDetail = ({ loaderData }) => {
  return (
    <>
      <dialog id="sliderDetails" className="modal">
        <div className="modal-box max-w-6xl">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">
              Know about {loaderData?.petName}
            </h3>
            <form method="dialog">
              <button className="btn btn-ghost text-lg text-error">
                <FaXmark />
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-10 my-5">
            <div className="md:w-[700px] h-[500px] rounded-xl overflow-hidden">
              <img
                src={loaderData?.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">Hi, I'm {loaderData?.petName}</h1>
                <span className="flex items-center card border px-6 py-3">
                  Adoption Fee
                  <p className="font-semibold">${loaderData?.petFee}*</p>
                </span>
              </div>
              <p className="font-light text-gray-700 mt-2">
                {loaderData?.description}
              </p>
              <div className="mt-10">
                <Link to={`/pet_detail/${loaderData?._id}`}>
                  <Button className="px-10 mt-8" size="lg">
                    More Details <FaLocationArrow />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
SliderDetail.propTypes = {
  loaderData: PropTypes.object,
};
export default SliderDetail;
