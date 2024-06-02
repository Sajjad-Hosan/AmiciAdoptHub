import About from "../../components/About/About";
import CallToAction from "../../components/CallToAction/CallToAction";
import Community from "../../components/Community/Community";
import PetsCategory from "../../components/PetsCategory/PetsCategory";
import Sliders from "../../components/Sliders/Sliders";

const Home = () => {
  return (
    <div>
      <Sliders />
      <PetsCategory />
      <CallToAction />
      <About />
      <Community/>
    </div>
  );
};

export default Home;
