import DonationCard from "../../components/DonationCard/DonationCard";

const DonationPage = () => {
  return (
    <div className="p-10">
      <h1 className="text-5xl text-center">Donation campaigns page</h1>
      <div className="mt-20 grid md:grid-cols-3 gap-5">
        <DonationCard/>
        <DonationCard/>
        <DonationCard/>
      </div>
    </div>
  );
};

export default DonationPage;
