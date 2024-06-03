import { Button, Card } from "flowbite-react";
import { Table } from "flowbite-react";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import AdoptMeModal from "../../components/AdoptMeModal/AdoptMeModal";
import useLoading from "../../hooks/useLoading";

const PetDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [_, setLoading] = useLoading();
  const handleClicks = (bool) => {
    setLoading(bool);
    setOpenModal(bool);
  };
  return (
    <>
      <AdoptMeModal open={openModal} setOpen={setOpenModal} />
      {/* ------------------- */}
      <div className="md:p-10">
        <div className="w-full h-[25rem] bg-orange-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 relative">
          <h1 className="text-5xl">
            Meet <span className="text-red-500 font-semibold">Burno</span>
          </h1>
          <p className="text-sm font-semibold md:w-1/2 text-center text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            ratione laborum sit perspiciatis ipsa doloremque, quis sequi
            incidunt nostrum quos blanditiis id explicabo qui aliquam debitis
            impedit maiores repellendus neque.
          </p>
          <Card className="absolute bottom-4 right-2">
            <p className="font-semibold">
              Adopeted Fee : <span className="text-red-500">$122</span>
            </p>
          </Card>
        </div>
        <div className="mt-16 flex flex-col gap-5">
          <div className="w-full h-full">
            <img
              className="h-full w-full object-cover fixed top-0 -z-10 left-0"
              src="https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/beautiful-dog-golden-retriever-labrador-sits-in-th-2023-05-13-00-32-27-utc-1-1536x1025.jpg"
              alt=""
            />
          </div>
          <div className="md:h-[35rem] p-12 bg-white bg-opacity-30 rounded-2xl shadow flex flex-col justify-between">
            <div className="">
              <h1 className="text-6xl">Hi i'm Buruo</h1>
              <p className="text-gray-800 w-11/12 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci itaque iste repudiandae at autem aut aspernatur non,
                esse pariatur eum voluptates labore dolor unde, culpa nisi!
                Nesciunt eaque eum sit ipsam voluptates, vel impedit adipisci
                nemo vero consequuntur quis repellat neque error iusto animi
                consectetur commodi suscipit veniam iure quae?
              </p>
            </div>
            <div className="overflow-hidden max-w-screen-md rounded-xl mt-5">
              <Table className="bg-base-100 bg-opacity-40">
                <Table.Body className="divide-y text-black grid md:grid-cols-2 place-items-start">
                  <Table.Row>
                    <Table.Cell className="font-semibold">Weight</Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>45 pound</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-semibold">
                      Date of Arrival
                    </Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>August 18 2023</Table.Cell>
                  </Table.Row>
                  <Table.Row className="flex">
                    <Table.Cell className="font-semibold">Sex</Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell className="pl-11">Male </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell className="font-semibold">
                      Adoption Fee
                    </Table.Cell>
                    <Table.Cell className="font-semibold"></Table.Cell>
                    <Table.Cell>$420*</Table.Cell>
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
