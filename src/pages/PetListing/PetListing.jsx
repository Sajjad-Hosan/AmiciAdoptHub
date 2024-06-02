import { Select } from "flowbite-react";
import { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import SearchBox from "../../components/SearchBox/SearchBox";
import CardComponent from "../../components/Card/CardComponent";
import { Button, Tooltip } from "@material-tailwind/react";
const PetListing = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <SearchBox open={openModal} setOpen={setOpenModal} />
      {/* -------------------- */}
      <div className="p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Pet Listing</h1>
          <div className="flex gap-5">
            <Tooltip
              content="Search"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <Button
                color="dark"
                outline
                size={"lg"}
                onClick={() => setOpenModal(true)}
              >
                <VscSearch className="text-md" />
              </Button>
            </Tooltip>
            <div className="">
              <Select id="countries" required>
                <option disabled>Category</option>
                <option>United States</option>
                <option>Canada</option>
                <option>France</option>
                <option>Germany</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-16">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
      </div>
    </>
  );
};

export default PetListing;
