import { Button, Input, Typography } from "@material-tailwind/react";
import Title from "../Title/Title";
import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterPlat = () => {
  return (
    <>
      <footer className="w-full bg-base-100 bg-opacity-25 p-8 mt-20 card rounded-3xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-y-6 gap-x-12 bg-transparent text-center md:justify-between">
          <Title />
          <div className="relative flex flex-col ">
            <p className="text-lg font-semibold mb-2">
              Stay Informed With Our Newsletter
            </p>
          </div>
        </div>
        <div className="flex flex-col mf:flex-row justify-between items-center gap-10">
          <div className="mt-5">
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 ">
            <li>
              <Typography
                as="a"
                href="#"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                About Us
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                License
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contribute
              </Typography>
            </li>
            <li>
              <Typography
                as="a"
                href="#"
                className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
              >
                Contact Us
              </Typography>
            </li>
          </ul>
        </div>
        <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue" className="text-center font-normal">
          &copy; 2020 AmiciAdoptHub
        </Typography>
      </footer>
    </>
  );
};

export default FooterPlat;
