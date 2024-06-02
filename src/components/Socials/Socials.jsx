import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa6";
import PropTypes from "prop-types";
const Socials = ({ layout }) => {
  return (
    <div>
      <div className={`divider ${layout}`}>Or</div>
      <ul className="menu menu-horizontal mt-6 flex justify-center gap-10">
        <li>
          <button
            className="tooltip btn btn-circle btn-outline flex"
            data-tip="google"
          >
            <FaGoogle />
          </button>
        </li>
        <li>
          <button
            className="tooltip btn btn-circle btn-outline flex"
            data-tip="facebook"
          >
            <FaFacebook />
          </button>
        </li>
        <li>
          <button
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
