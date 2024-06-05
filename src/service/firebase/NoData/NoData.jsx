import { VscWarning } from "react-icons/vsc";

const NoData = () => {
  return (
    <div className="p-5 bg-red-200 rounded-xl w-full my-10 flex justify-between items-center">
      <h1 className="text-5xl">
        <VscWarning />
      </h1>
      <h1 className="text-2xl">No Data</h1>
    </div>
  );
};

export default NoData;
