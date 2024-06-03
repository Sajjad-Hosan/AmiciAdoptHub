import { Input, Option, Select } from "@material-tailwind/react";
import DonationCard from "../../components/DonationCard/DonationCard";

const DonationPage = () => {
  return (
    <div className="md:p-10">
      <h1 className="text-3xl md:text-5xl text-center">Donation campaigns page</h1>
      <div className="flex justify-between items-center gap-10 mt-9">
        <div className="w-1/2">
          <Input variant="standard" label="Search Here" placeholder="search" />
        </div>
        <div className="flex w-1/2 flex-col gap-6">
          <Select size="lg" label="Sort by">
            <Option defaultChecked>Date</Option>
            <Option>Amount</Option>
            <Option disabled>Coming soon</Option>
          </Select>
        </div>
      </div>
      <div className="mt-20 grid md:grid-cols-3 gap-5 place-items-center">
        <DonationCard />
        <DonationCard />
        <DonationCard />
      </div>
    </div>
  );
};

export default DonationPage;
