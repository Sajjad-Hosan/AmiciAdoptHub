import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Welcome from "../Welcome/Welcome";
import useAuth from "../../hooks/useAuth";
import FooterPlat from "../../components/Footer/Footer";

const Root = () => {
  const { moment } = useAuth();
  if (!moment) {
    return <Welcome />;
  }
  return (
    <div className="pt-2 font-mono">
      <div className="px-5">
        <Navbar />
        <Outlet />
      </div>
      <FooterPlat />
    </div>
  );
};

export default Root;
