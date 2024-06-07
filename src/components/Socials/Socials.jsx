import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Socials = ({ layout }) => {
  const { google, github, isPro, setIsPro } = useAuth();
  const navigate = useNavigate();
  const handleGoogle = () => {
    setIsPro(true);
    google().then(() => {
      toast.success("login by google");
      navigate("/");
    });
  };
  const handleGithub = () => {
    setIsPro(true);
    github().then(() => {
      toast.success("login by github");
      navigate("/");
    });
  };
  const handleCooking = () => {
    toast.warning("The method is cooking now?");
    navigate("/");
  };
  return (
    <div>
      <div className={`divider ${layout}`}>Or</div>
      <ul className="menu menu-horizontal mt-6 flex justify-center gap-10">
        <li>
          <button
            onClick={handleGoogle}
            className="tooltip btn btn-circle btn-outline flex"
            data-tip="google"
          >
            <FaGoogle />
          </button>
        </li>
        <li>
          <button
            onClick={handleCooking}
            className="tooltip btn btn-circle btn-outline flex"
            data-tip="facebook"
          >
            <FaFacebook />
          </button>
        </li>
        <li>
          <button
            onClick={handleGithub}
            className="tooltip btn btn-circle btn-outline flex"
            data-tip="github"
          >
            <FaGithub />
          </button>
        </li>
      </ul>
    </div>
  );
};
Socials.propTypes = {
  layout: PropTypes.string,
};
export default Socials;
