import { useState } from "react";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { TbShieldQuestion } from "react-icons/tb";
import { GiJumpingDog } from "react-icons/gi";
import Socials from "../../components/Socials/Socials";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import login from "../../assets/Authen/doggy_login.svg";
import Title from "../../components/Title/Title";
import { useForm } from "react-hook-form";

const Login = () => {
  const {register,handleSubmit} = useForm()
  const [type, setType] = useState(false);
  const handleRegister = (log) => {
    
    console.log(log)
  } 
  return (
    <div className="max-w-screen-lg mx-auto mt-5 font-mono p-5">
      <Helmet>
        <title> AmiciAdoptHub | Login</title>
      </Helmet>
      <div className="card border border-orange-200  flex flex-col-reverse md:flex-row justify-between gap-6 overflow-hidden">
        <div className="p-10 w-full">
          <h1 className="text-3xl flex items-center gap-3">Login</h1>
          <form className="mt-5" onSubmit={handleSubmit(handleRegister)}>
            <div className="form-control">
              <label className="label">Write Your Email</label>
              <input
                type="text"
                {...register('email',{required: true})}
                className="input input-bordered"
                placeholder="email"
              />
            </div>
            <div className="form-control relative mt-4">
              <label className="label">Write Your Password</label>
              <input
                type={type ? "text" : "password"}
                className="input input-bordered"
                {...register('password',{required: true})}
                placeholder="password"
              />
              <span
                className="absolute right-8 bottom-4"
                onClick={() => setType(!type)}
              >
                {type ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            <label className="label justify-start gap-2"><input type="checkbox" name="" /> Remember me</label>
            <div className="form-control mt-9 w-52 ml-auto">
              <button className="btn btn-neutral">
                Login <FiLogIn />
              </button>
            </div>
          </form>
          <div className="mt-16 flex items-center justify-between">
            <Link to="/register" className="btn btn-neutral btn-outline md:px-10">
              <GiJumpingDog /> Create New
            </Link>
            <button className="btn btn-neutral px-8">
              <TbShieldQuestion /> Forgot Password
            </button>
          </div>
        </div>
        <div className="md:w-3/4 bg-orange-200 px-10 flex flex-col  justify-center p-10">
          <h1 className="text-2xl">We have brought many new friends for you on -</h1>
          <Title />
          <img src={login} alt="" className="w-full h-3/4" />
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default Login;
