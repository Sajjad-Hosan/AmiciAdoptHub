import { Button, Card, Table } from "flowbite-react";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import AdoptMeModal from "../../components/AdoptMeModal/AdoptMeModal";
import useLoading from "../../hooks/useLoading";
import { useLoaderData } from "react-router-dom";

const PetDetails = () => {
  const loaderData = useLoaderData();
  const {
    image,
    petName,
    petAge,
    petLocation,
    petGender,
    petFee,
    petWeight,
    shortDescription,
    description,
    adopted,
    petAddDate,
  } = loaderData;

  const [openModal, setOpenModal] = useState(false);
  const [_, setLoading] = useLoading();
  const handleClicks = (bool) => {
    setLoading(bool);
    setOpenModal(bool);
  };
  return (
    <>
      <AdoptMeModal open={openModal} setOpen={setOpenModal} pet={loaderData} />
      {/* ------------------- */}
      <div className="md:p-10">
        <div className="w-full h-[25rem] bg-orange-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 relative">
          <div
            className={`${
              adopted ? "bg-green-500" : "bg-red-600"
            } absolute top-5 right-5 px-6 py-2 rounded-lg text-white font-semibold`}
          >
            {adopted ? "yes" : "no"}
          </div>
          <h1 className="text-5xl">
            Meet <span className="text-red-500 font-semibold">{petName}</span>
          </h1>
          <p className="text-sm font-semibold md:w-1/2 text-center text-gray-600">
            {shortDescription}
          </p>
          <Card className="absolute bottom-4 right-2">
            <p className="font-semibold">
              Adopeted Fee : <span className="text-red-500">${petFee}</span>
            </p>
          </Card>
        </div>
        <div className="mt-16 flex flex-col gap-5">
          <div className="w-full h-full">
            <img
              className="h-full w-full object-cover fixed top-0 -z-10 left-0"
              src={image}
              alt=""
            />
          </div>
          <div className="md:h-[35rem] p-12 bg-white bg-opacity-30 rounded-2xl shadow flex flex-col justify-between">
            <div className="">
              <h1 className="text-6xl">Hi i'm {petName}</h1>
              <p className="text-gray-800 w-11/12 mt-2">{description}</p>
            </div>
            <div className="overflow-hidden max-w-screen-md rounded-xl mt-5">
              <Table className="bg-base-100 bg-opacity-40">
                <Table.Body className="divide-y text-black grid md:grid-cols-2 place-items-start">
                  <Table.Row>
                    <Table.Cell className="font-semibold">Weight</Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>{petWeight}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-semibold">
                      Date of Arrival
                    </Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>{petAddDate}</Table.Cell>
                  </Table.Row>
                  <Table.Row className="flex">
                    <Table.Cell className="font-semibold">Sex</Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell className="pl-11">{petGender} </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-semibold">
                      Adoption Fee
                    </Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>${petFee}*</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-semibold">Age</Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>{petAge} month</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-semibold">Location</Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>{petLocation}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
            <div className="flex justify-end mt-5">
              <Button
                className="px-10"
                size="lg"
                onClick={() => handleClicks(true)}
              >
                Adopt Me <FaLocationArrow />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PetDetails;
