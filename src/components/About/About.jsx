import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AboutModal from "../AboutModal/AboutModal";
const About = () => {
  const [open, setOpen] = useState(1);
  const [openMo, setOpenMo] = useState(false);
  const handleOpenModal = () => setOpenMo(!openMo);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <>
      <AboutModal open={openMo} handleOpenModal={handleOpenModal} />
      {/* ------------------------------------------------------ */}
      <div className="mt-20 md:px-10">
        <div className="text-center space-y-2">
          <h1 className="text-4xl">About Us</h1>
          <p className="">Connecting Pets with Loving Homes</p>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-14 place-items-center">
          <div className="w-full h-[300px]">
            <img
              className="w-full h-full object-cover rounded-xl"
              src="https://templatekit.jegtheme.com/pawsnest/wp-content/uploads/sites/417/2023/10/cute-cat-is-in-pet-booth-that-indoors-in-the-moder-2021-09-03-14-42-56-utc-e1696820317756.jpg"
              alt=""
            />
          </div>
          <div className="md:col-span-2">
            <Accordion
              open={open === 1}
              icon={open === 1 ? <FaMinus /> : <FaPlus />}
            >
              <AccordionHeader onClick={() => handleOpen(1)}>
                Browse Available Pets
              </AccordionHeader>
              <AccordionBody>
                Explore our comprehensive list of pets looking for a home. Use
                our search filters to find the perfect match based on species,
                breed, age, and more.
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 2}
              icon={open === 2 ? <FaMinus /> : <FaPlus />}
            >
              <AccordionHeader onClick={() => handleOpen(2)}>
                Learn About Each Pet
              </AccordionHeader>
              <AccordionBody>
                Click on a pet’s profile to learn more about their personality,
                background, and special needs.
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 3}
              icon={open === 3 ? <FaMinus /> : <FaPlus />}
            >
              <AccordionHeader onClick={() => handleOpen(3)}>
                Submit an Adoption Application
              </AccordionHeader>
              <AccordionBody>
                Once you've found a pet you'd like to adopt, fill out our
                easy-to-use adoption application form.
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 4}
              icon={open === 4 ? <FaMinus /> : <FaPlus />}
            >
              <AccordionHeader onClick={() => handleOpen(4)}>
                Schedule a Meet-and-Greet
              </AccordionHeader>
              <AccordionBody>
                After your application is reviewed, we'll arrange a
                meet-and-greet with the pet to ensure a good fit.
              </AccordionBody>
            </Accordion>
            <Accordion
              open={open === 5}
              icon={open === 5 ? <FaMinus /> : <FaPlus />}
            >
              <AccordionHeader onClick={() => handleOpen(5)}>
                Bring Your New Friend Home
              </AccordionHeader>
              <AccordionBody>
                Complete the adoption process and welcome your new pet into your
                family!
              </AccordionBody>
            </Accordion>
            <Button color="outlined" className="mt-5" onClick={handleOpenModal}>
              Why This Website Was Made ?{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
