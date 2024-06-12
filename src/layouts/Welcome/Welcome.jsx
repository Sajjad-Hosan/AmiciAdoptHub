import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import img1 from "../../assets/Welcome/welcome.gif";
import useAuth from "../../hooks/useAuth";
import Title from "../../components/Title/Title";

const Welcome = () => {
  const { moment, setMoment } = useAuth();
  const handleWelcome = (moment) => {
    setMoment(moment);
    localStorage.setItem("moment", moment);
  };
  return (
    <div
      className={`p-10 md:p-20 flex flex-col-reverse items-center md:flex-row justify-between md:min-h-screen ${
        moment ? "hidden" : ""
      }`}
    >
      <div className="text-center">
        <h1 className="text-4xl font-semibold flex items-center justify-center gap-4">
          <p className="font-light text-[18px]">Welcome to</p>
         <Title size="2xl"/>
        </h1>
        <p className="capitalize md:w-3/3 text-center mt-5 leading-7 font-light text-gray-400">
          Here you will meet your new friend or you can go home with a new
          friend.Because,you will find many category friend here.and We try our
          best to have a good relationship with people and animals. Because we
          want a happy and trustworthy society. Where we all live together. But,
          we can't do it without your help. So, be a part of our dream. Then we
          will be closer to our journey.
        </p>
        <Link
          to="/"
          className="btn btn-neutral px-10 mt-10"
          onClick={() => handleWelcome(true)}
        >
          Journey Start <FaArrowRightLong />
        </Link>
      </div>
      <div className="w-full h-[300px]">
        <img src={img1} className="h-full mx-auto" />
      </div>
    </div>
  );
};

export default Welcome;
