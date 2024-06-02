import { Input, Option, Select } from "@material-tailwind/react";
import DonationCard from "../../components/DonationCard/DonationCard";

const DonationPage = () => {
  return (
    <div className="p-10">
      <h1 className="text-5xl text-center">Donation campaigns page</h1>
      <div className="flex justify-between items-center mt-9">
        <div className="w-96">
          <Input variant="standard" label="Search Here" placeholder="search" />
        </div>
        <div className="flex w-72 flex-col gap-6">
          <Select size="lg" label="Sort by">
            <Option defaultChecked>Date</Option>
            <Option>Amount</Option>
            <Option disabled>Coming soon</Option>
          </Select>
        </div>
      </div>
      <div className="mt-20 grid md:grid-cols-3 gap-5">
        <DonationCard />
        <DonationCard />
        <DonationCard />
      </div>
    </div>
  );
};

export default DonationPage;
