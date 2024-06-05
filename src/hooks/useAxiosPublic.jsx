import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:1000",
});
const useAxiosPublic = () => {
  return axiosPublic;
};
export default useAxiosPublic;
