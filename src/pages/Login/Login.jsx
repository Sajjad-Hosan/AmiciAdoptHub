import { useState } from "react";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { TbShieldQuestion } from "react-icons/tb";
import { GiJumpingDog } from "react-icons/gi";
import Socials from "../../components/Socials/Socials";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/Authen/doggy_login.svg";
import Title from "../../components/Title/Title";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "sonner";

const Login = () => {
  const { signInUser } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleRegister = (log) => {
    const email = log.email;
    const password = log.password;
   
    signInUser(email, password).then((res) => {
      console.log(res);
      toast.success("Login");
      reset();
      navigate(location.state || "/");
    });
  };
  return (
    <div className="max-w-screen-lg mx-auto mt-5 font-mono p-5">
      <Helmet>
        <title> AmiciAdoptHub | Login</title>
      </Helmet>
      <div className="card border border-orange-200  flex flex-col-reverse md:flex-row justify-between gap-6 overflow-hidden">
        <div className="p-10 w-full">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Login
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Welcome back
            </Typography>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-full"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div className="mb-1 flex flex-col gap-4">
                <div className="">
                  <Typography variant="h6" color="blue-gray" className="mb-3">
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
                  <Typography variant="h6" color="blue-gray" className="mb-3">
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
                    // labelProps={{
                    //   className: "before:content-none after:content-none",
                    // }}
                  />
                  <span
                    className="absolute top-[3rem] right-6 mt-1 text-md"
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
                    Remember me
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button className="mt-6" fullWidth type="submit">
                Login
              </Button>
            </form>
          </Card>
          <div className="mt-16 flex items-center justify-between">
            <Link
              to="/register"
              className="btn btn-neutral btn-outline md:px-10"
            >
              <GiJumpingDog /> Create New
            </Link>
            <button className="btn btn-neutral px-8">
              <TbShieldQuestion /> Forgot Password
            </button>
          </div>
        </div>
        <div className="md:w-3/4 bg-orange-200 px-10 flex flex-col  justify-center p-10">
          <h1 className="text-2xl">
            We have brought many new friends for you on -
          </h1>
          <Title />
          <img src={login} alt="" className="w-full h-3/4" />
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default Login;
