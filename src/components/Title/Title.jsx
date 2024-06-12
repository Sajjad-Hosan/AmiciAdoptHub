import PropTypes from "prop-types";

const Title = ({ size = "xl" }) => {
  return (
    <div className={`flex items-center gap-1 text-${size}`}>
      <img src="/logo.png" alt="" className="w-10" /> AmiciAdoptHub
    </div>
  );
};
Title.propTypes = {
  size: PropTypes.string,
};
export default Title;
