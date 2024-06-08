import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:1000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

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
          signOut();
        }
      }
    );
  }, []);
  return axiosSecure;
};
export default useAxiosSecure;
