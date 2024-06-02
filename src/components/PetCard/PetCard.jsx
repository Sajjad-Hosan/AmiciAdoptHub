import img from "../../assets/Images/bruno.jpg";
import PropTypes from "prop-types";
const PetCard = ({ details }) => {
  const handleCurrentCard = (id) => {
    console.log(id);
  };
  return (
    <div
      className="card shadow h-[500px] overflow-hidden relative  cursor-pointer petCard"
      onClick={() => handleCurrentCard(10)}
    >
      <img src={img} alt="" className="w-full h-full object-cover z-10 " />
      <div className="hover:bg-gray-800 hover:bg-opacity-30 z-20 p-8 petCardContext absolute">
        <div className=" space-y-2 absolute bottom-5 right-5 text-right">
          <h1 className="text-4xl">Burno</h1>
        </div>
      </div>
    </div>
  );
};
PetCard.propTypes = {
  details: PropTypes.object,
};
export default PetCard;
