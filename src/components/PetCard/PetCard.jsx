import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const PetCard = ({ details }) => {
  return (
    <Link to={`/pet_detail/${details?._id}`}>
      <div className="card shadow h-[500px] overflow-hidden relative  cursor-pointer petCard">
        <img
          src={details?.image}
          alt={details?.petName}
          className="w-full h-full object-cover z-10 "
        />
        <div className="hover:bg-gray-800 hover:bg-opacity-30 z-20 p-8 petCardContext absolute">
          <div className=" space-y-2 absolute bottom-5 right-5 text-right">
            <h1 className="text-4xl text-white">{details?.petName}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};
PetCard.propTypes = {
  details: PropTypes.object,
};
export default PetCard;
