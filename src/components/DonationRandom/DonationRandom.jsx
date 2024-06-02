import RandomCard from "../RandomCard/RandomCard";

const DonationRandom = () => {
  return (
    <div className="mt-16">
     <h1 className="text-3xl text-white text-center">Want To Help More Pets</h1>
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        <RandomCard />
        <RandomCard />
        <RandomCard />
      </div>
    </div>
  );
};

export default DonationRandom;
