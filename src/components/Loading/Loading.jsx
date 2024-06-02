import loader from "../../assets/Loading/loading.gif";
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full bg-white">
      <img src={loader} alt="" className="w-64" />
    </div>
  );
};
export default Loading;
