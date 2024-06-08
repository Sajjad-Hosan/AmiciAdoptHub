import { useEffect, useState } from "react";
import PetCard from "../PetCard/PetCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";const PetsCategory = () => {
  const categorys = ["dog", "cat", "rabbit", "snake", "fish", "bird"];
  const [tab, setTab] = useState(0);
  const [tabName, setTabName] = useState("dog");
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const handleTab = (i, item) => {
    setTab(i);
    setTabName(item);
  };
  useEffect(() => {
    axiosSecure.get(`/pets_category?category=${tabName}`).then((res) => {
      setData(res.data);
    });
  }, [axiosSecure, tabName]);

  return (
    <div className="mt-20 md:px-10">
      <h1 className="text-4xl text-center">Pets Category</h1>
      <div
        role="tablist"
        className="tabs tabs-lifted mt-14 max-w-screen-lg mx-auto"
      >
        {categorys.map((item, i) => (
          <button
            key={item}
            role="tab"
            className={`tab capitalize ${
              tab === i ? "tab-active font-semibold" : ""
            }`}
            onClick={() => handleTab(i, item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-6 pb-10 ">
        {data.map((item) => (
          <PetCard key={item._id} details={item} />
        ))}
      </div>
    </div>
  );
};

export default PetsCategory;
