import axios from "axios";

const axiosSrcure = axios.create({
  baseURL: "http://localhost:1000",
  //   withCredentials: true,
});
const useAxiosSecure = () => {
  return axiosSrcure;
};
export default useAxiosSecure;
