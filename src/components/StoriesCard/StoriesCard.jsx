import PropTypes from "prop-types";
const StoriesCard = ({ storie }) => {
  return (
    <div className="card relative">
      <div className="card h-[500px] storiesCard overflow-hidden">
        <img
          src={
            "https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/man-and-his-dog-2021-08-27-10-46-27-utc-1.jpg"
          }
          alt=""
          className="w-full h-full object-cover z-10"
        />
        <div className="absolute w-full h-full bg-base-300 bg-opacity-35 z-10 p-10 StorieContext">
          <q className="font-semibold">
            I had always dreamed of having a furry friend to share my life with,
            and that dream came true when I adopted Max from PawsNest. Max, a
            gentle and loving Labrador mix, stole my heart the moment I saw him.
            His wagging tail and hopeful eyes told a story of resilience and
            unwavering trust. Since that day, Max has been my faithful
            companion, bringing boundless joy and love into my life.
          </q>
        </div>
      </div>
      <div className="card border p-5 absolute left-4 bottom-5 z-10 bg-gray-600 bg-opacity-30 text-white space-y-2">
        <h1 className="text-xl">Morgan & Max</h1>
        <p className="text-sm">A Tale of Unconditional Love</p>
      </div>
    </div>
  );
};
StoriesCard.propTypes = {
  storie: PropTypes.object,
};
export default StoriesCard;
