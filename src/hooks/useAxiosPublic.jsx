import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://amici-adopt-hub-server.vercel.app",
  withCredentials: true,
});
const useAxiosPublic = () => {
  return axiosPublic;
};
export default useAxiosPublic;
