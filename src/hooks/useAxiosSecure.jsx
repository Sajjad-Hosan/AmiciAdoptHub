import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "https://amici-adopt-hub-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      function (res) {
        return res;
      },
      async function (error) {
        console.log("error from axios secure", error);
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          console.log("logout");
        }
      }
    );
  }, []);
  return axiosSecure;
};
export default useAxiosSecure;
