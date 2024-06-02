import { Badge, Button } from "flowbite-react";
import { FaDonate } from "react-icons/fa";
import DonationRandom from "../../components/DonationRandom/DonationRandom";
import PaymentModal from "../../components/PaymentModal/PaymentModal";
import { useState } from "react";
const DonationDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const dog = {
    name: "Bella",
    species: "Dog",
    breed: "Labrador Retriever",
    age: "3 years",
    image: "https://example.com/bella.jpg",
    description:
      "Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.Bella is a friendly and energetic Labrador Retriever who loves to play and is looking for a loving home.",
  };
  return (
    <>
    <PaymentModal open={openModal} setOpen={setOpenModal}/>
      <div className="p-10">
        <div className="fixed top-0 left-0 -z-10">
          <img
            src="https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/rescue-dog-animal-shelter-and-puppy-playing-alone-2023-01-06-17-06-59-utc.jpg"
            alt=""
            className="w-full-h-full"
          />
        </div>
        <div className="h-[30rem] bg-white bg-opacity-50 p-10 flex flex-col items-center justify-center gap-4 rounded-3xl">
          <h1 className="text-5xl text-center capitalize">Help Bornu</h1>
          <h2 className="text-3xl capitalize">
            Give him/her a Brighter Future
          </h2>
          <p className="text-center">
            Every pet deserves a loving home, proper care, and a chance to
            thrive. Your generous donation helps us provide essential services
            such as shelter, food, medical care, and adoption programs for
            homeless and abandoned animals. Join us in making a difference in
            the lives of these wonderful companions. Donate today and be a hero
            for pets in need!
          </p>
        </div>
        <div className="h-[38rem] bg-white bg-opacity-40 mt-32 p-10 flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 rounded-2xl shadow h-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/rescue-dog-animal-shelter-and-puppy-playing-alone-2023-01-06-17-06-59-utc.jpg"
              alt=""
            />
          </div>
          <div className="px-14 py-10 w-full space-y-3 relative">
            <div className="px-9 py-2 border rounded-full font-semibold absolute right-3">
              {dog.age}
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-5xl">{dog.name}</h1>
              <Badge size="sm" className="mt-4">
                {dog.species}
              </Badge>
            </div>
            <p className="font-semibold pl-1">{dog.breed}</p>
            <p className="text-gray-900 pl-1">{dog.description}</p>
            <div className="flex justify-end">
              <Button color="dark" onClick={() => setOpenModal(true)}>
                <FaDonate className="mr-2 h-5 w-5" />
                Donate now
              </Button>
            </div>
          </div>
        </div>
        <DonationRandom />
      </div>
    </>
  );
};

export default DonationDetails;
