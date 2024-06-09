import { useQuery } from "@tanstack/react-query";
import RandomCard from "../RandomCard/RandomCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// TODO: random card show
const DonationRandom = () => {
  const axiosSecure = useAxiosSecure();
  const { data = [] } = useQuery({
    queryKey: ["donation_random"],
    queryFn: async () => {
      const res = await axiosSecure.post(`/donations?page=0`);
      return res.data;
    },
  });
  return (
    <div className="mt-16">
      <h1 className="text-3xl text-white text-center">
        Want To Help More Pets
      </h1>
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {data.slice(0, 3).map((item) => {
          return <RandomCard key={item._id} detail={item} />;
        })}
      </div>
    </div>
  );
};

export default DonationRandom;
