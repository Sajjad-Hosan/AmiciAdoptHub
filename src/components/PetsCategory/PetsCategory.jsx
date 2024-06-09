import { useState } from "react";
import PetCard from "../PetCard/PetCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../Skeleton/Skeleton";
const PetsCategory = () => {
  const categorys = ["dog", "cat", "rabbit", "snake", "fish", "bird"];
  const [tab, setTab] = useState(0);
  const [tabName, setTabName] = useState("dog");
  const axiosSecure = useAxiosSecure();
  const handleTab = (i, item) => {
    setTab(i);
    setTabName(item);
  };
  const { data = [], isLoading } = useQuery({
    queryKey: ["categorys", tabName, axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pets_category?category=${tabName}`);
      return res.data;
    },
  });

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
        {data.map((item) =>
          isLoading ? (
            <Skeleton key={item._id} />
          ) : (
            <PetCard key={item._id} details={item} />
          )
        )}
      </div>
    </div>
  );
};

export default PetsCategory;
