import { Input, Option, Select } from "@material-tailwind/react";
import DonationCard from "../../components/DonationCard/DonationCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const DonationPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/donation_campaign?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="md:p-10">
      <Helmet>
        <title>Donation Page | AAH</title>
      </Helmet>

      <h1 className="text-3xl md:text-5xl text-center">
        Donation campaigns page
      </h1>
      <div className="flex justify-between items-center gap-10 mt-9">
        <div className="md:w-96">
          <Input variant="standard" label="Search Here" placeholder="search" />
        </div>
        <div className="flex md:w-96 flex-col gap-6">
          <Select size="lg" label="Sort by">
            <Option defaultChecked>Date</Option>
            <Option>Amount</Option>
            <Option disabled>Coming soon</Option>
          </Select>
        </div>
      </div>
      <div className="mt-20 grid md:grid-cols-3 gap-5 place-items-center">
        {data?.map((item) => (
          <DonationCard key={item._id} donated={item} />
        ))}
      </div>
    </div>
  );
};

export default DonationPage;
