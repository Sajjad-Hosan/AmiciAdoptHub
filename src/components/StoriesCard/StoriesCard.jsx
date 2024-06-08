import PropTypes from "prop-types";
const StoriesCard = ({ storie }) => {
  return (
    <div className="card relative">
      <div className="card h-[500px] storiesCard overflow-hidden">
        <img
          src={storie.image}
          alt={storie.petName}
          className="w-full h-full object-cover z-10"
        />
        <div className="absolute w-full h-full bg-base-300 bg-opacity-35 z-10 p-10 StorieContext">
          <q className="font-semibold">{storie.shortStory}</q>
        </div>
      </div>
      <div className="card border p-5 absolute left-4 bottom-5 z-10 bg-gray-600 bg-opacity-30 text-white space-y-2">
        <h1 className="text-xl">
          {storie.customerName} & {storie.petName}
        </h1>
        <p className="text-sm">{storie.store}</p>
      </div>
    </div>
  );
};
StoriesCard.propTypes = {
  storie: PropTypes.object,
};
export default StoriesCard;
