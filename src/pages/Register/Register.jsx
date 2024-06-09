import { useState } from "react";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { FileInput, Label } from "flowbite-react";
import { LuImagePlus } from "react-icons/lu";
import { GiJumpingDog } from "react-icons/gi";
import Socials from "../../components/Socials/Socials";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/Authen/doggy_register.svg";
import Title from "../../components/Title/Title";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import ImageModal from "./ImageModal";
import { toast } from "sonner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, isImage, isPro, setIsPro } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleCreate = (log) => {
    const password = log.password;
    if (password.length < 6) {
      return toast.warning("password must be 6 character!");
    }
    if (!regex.test(password)) {
      return toast.warning(
        "Password must have Upper ,Lower, Number ,Special character!"
      );
    }

    //TODO: Api use for picture add and then use
    createUser(log.email, log.password)
      .then((res) => {
        updateProfile(res.user, {
          displayName: log.username,
          photoURL: isImage,
        });
        setIsPro(false);
        // --------------------------
        if (res?.user?.accessToken || !isPro) {
          const info = {
            name: log.username,
            email: res.user?.email,
            emailVerified: res.user?.emailVerified,
            image: isImage,
            uId: res.user?.uid,
            admin: false,
            block: false,
            lastLogin: res.user?.metadata?.lastSignInTime,
            lastSignIn: res.user?.metadata?.lastSignInTime,
            createTime: res.user?.metadata?.creationTime,
          };
          axiosSecure.post("/user", info).then((res) => {
            console.log(res.data);
            navigate("/");
            reset();
          });
        }
      })
      .catch((e) => {
        const error = e.message.split(" ")[2];
        if (error === "(auth/email-already-in-use).") {
          toast.error("The email is already use !");
        }
        console.log(e);
      });
  };
  return (
    <>
      <ImageModal openModal={openModal} setOpenModal={setOpenModal} />
      <div className="max-w-screen-lg mx-auto mt-5 font-mono p-5">
        <Helmet>
          <title> AmiciAdoptHub | Register</title>
        </Helmet>
        <div className="card border border-orange-200  flex flex-col-reverse md:flex-row-reverse justify-between gap-6 overflow-hidden">
          <div className="p-10 w-full">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Sign Up
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
              </Typography>
              <form
                className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full"
                onSubmit={handleSubmit(handleCreate)}
              >
                <div className="flex justify-end">
                  {isImage ? (
                    <div
                      className="w-28 rounded-lg overflow-hidden"
                      onClick={() => setOpenModal(true)}
                    >
                      <img src={isImage} alt="" className="w-full h-full" />
                    </div>
                  ) : (
                    <Tooltip content="choose picture">
                      <Button onClick={() => setOpenModal(true)} variant="text">
                        <LuImagePlus className="text-xl" />
                      </Button>
                    </Tooltip>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="">
                    <Typography variant="h6" color="blue-gray">
                      Your Name
                    </Typography>
                    {errors.username?.type === "required" && (
                      <p role="alert" className="text-red-500 capitalize my-1">
                        username is required
                      </p>
                    )}
                    <Input
                      size="lg"
                      placeholder="name"
                      {...register("username", { required: true })}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div className="">
                    <Typography variant="h6" color="blue-gray">
                      Your Email
                    </Typography>
                    {errors.email?.type === "required" && (
                      <p role="alert" className="text-red-500 capitalize my-1">
                        email is required
                      </p>
                    )}
                    <Input
                      size="lg"
                      placeholder="name@mail.com"
                      {...register("email", { required: true })}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div className="relative">
                    <Typography variant="h6" color="blue-gray">
                      Password
                    </Typography>
                    {errors.password?.type === "required" && (
                      <p role="alert" className="text-red-500 capitalize my-1">
                        password is required
                      </p>
                    )}
                    <Input
                      type={show ? "text" : "password"}
                      size="lg"
                      {...register("password", { required: true })}
                      placeholder="password"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <span
                      className="absolute top-[2.3rem] right-6 mt-1 text-md"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <FiEye /> : <FiEyeOff />}
                    </span>
                  </div>
                </div>
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                    >
                      I agree the
                      <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                      >
                        &nbsp;Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                />
                <Button className="mt-6" fullWidth type="submit">
                  sign up
                </Button>
              </form>
            </Card>
          </div>
          <div className="md:w-3/4 bg-orange-200 px-10 flex flex-col  justify-center p-10">
            <h1 className="text-2xl">Discover the world of pets with us</h1>
            <Title />
            <img src={login} alt="" className="w-full h-3/4" />
            <Socials />
            <Link
              to="/login"
              className="btn btn-neutral btn-outline px-10 mt-6"
            >
              <GiJumpingDog /> Already Have
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
