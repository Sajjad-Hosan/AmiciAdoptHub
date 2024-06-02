import { useState } from "react";
import { FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { GiJumpingDog } from "react-icons/gi";
import Socials from "../../components/Socials/Socials";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/Authen/doggy_register.svg";
import Title from "../../components/Title/Title";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const { createUser } = useAuth();
  const [type, setType] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (log) => {
    //TODO: Api use for picture add and then use
    createUser(log.email, log.password).then((res) => {
        console.log(log.photo[0])
      updateProfile(res.user, {
        displayName: log.name,
        photoURL: log.photo.image[0],
      }).then(() => {
          navigate("/");
      })
    });
  };
  return (
    <div className="max-w-screen-lg mx-auto mt-5 font-mono p-5">
      <Helmet>
        <title> AmiciAdoptHub | Register</title>
      </Helmet>
      <div className="card border border-orange-200  flex flex-col-reverse md:flex-row-reverse justify-between gap-6 overflow-hidden">
        <div className="p-10 w-full">
          <h1 className="text-3xl">Register</h1>
          <form className="mt-5" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control">
              <label className="label">Write Your Name</label>
              <input
                type="text"
                className="input input-bordered"
                {...register("name", { required: true })}
                placeholder="name"
              />
            </div>
            <div className="form-control">
              <label className="label">Write Your Email</label>
              <input
                type="email"
                className="input input-bordered"
                {...register("email", { required: true })}
                placeholder="email"
              />
            </div>

            <div className="form-control relative mt-2">
              <label className="label">Write Your Password</label>
              <input
                type={type ? "text" : "password"}
                className="input input-bordered"
                {...register("password", { required: true })}
                placeholder="password"
              />
              <span
                className="absolute right-8 bottom-4"
                onClick={() => setType(!type)}
              >
                {type ? <FiEye /> : <FiEyeOff />}
              </span>
            </div>
            <div className="form-control">
              <label className="label">Choses Picture</label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("photo", { required: true })}
              />
            </div>
            <div className="form-control mt-9 w-52 ml-auto">
              <button className="btn btn-neutral">
                Register <FiLogIn />
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-3/4 bg-orange-200 px-10 flex flex-col  justify-center p-10">
          <h1 className="text-2xl">Discover the world of pets with us</h1>
          <Title />
          <img src={login} alt="" className="w-full h-3/4" />
          <Socials />
          <Link to="/login" className="btn btn-neutral btn-outline px-10 mt-6">
            <GiJumpingDog /> Already Have
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
