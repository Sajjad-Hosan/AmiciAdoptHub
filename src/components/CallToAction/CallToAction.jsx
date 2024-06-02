import img from "../../assets/Images/bruno.jpg";
import StoriesCard from "../StoriesCard/StoriesCard";
import { MdOutlinePets } from "react-icons/md";
const CallToAction = () => {
  return (
    <div className="my-20 md:px-10">
      <h1 className="text-3xl text-center md:w-1/2 mx-auto">
        From Shelter to Forever Home Our Success Stories
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
        <StoriesCard />
        <StoriesCard />
        <StoriesCard />
      </div>
      <div className="flex gap-5 mt-8 justify-end">
        <button className="btn px-6 btn-outline">See Available Pets</button>
        <button className="btn px-6 btn-neutral">
          Adopt Pet <MdOutlinePets />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
