import PropTypes from "prop-types";
const StoriesCard = ({ story }) => {
  return (
    <div className="card relative">
      <div className="card h-[500px] storiesCard overflow-hidden">
        <img
          src={story.image}
          alt={story.petName}
          className="w-full h-full object-cover z-10"
        />
        <div className="absolute w-full h-full bg-base-300 bg-opacity-35 z-10 p-10 StorieContext">
          <q className="font-semibold">{story.shortStory}</q>
        </div>
      </div>
      <div className="card border p-5 absolute left-4 bottom-5 z-10 bg-gray-600 bg-opacity-30 text-white space-y-2">
        <h1 className="text-xl">
          {story.customerName} & {story.petName}
        </h1>
        <p className="text-sm">{story.store}</p>
      </div>
    </div>
  );
};
StoriesCard.propTypes = {
  story: PropTypes.object,
};
export default StoriesCard;
