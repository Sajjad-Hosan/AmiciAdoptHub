import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:1000",
  withCredentials: true,
});
const useAxiosSecure = () => {
  // const navigate = useNavigate();
  useEffect(() => {

      axios.interceptors.response.use(
        function (res) {
          return res;
        },
        function (error) {
          console.log("error from axios secure", error.response);
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            console.log("logout");
            // signOutUser().then(() => {
            //   navigate("/login");
            // });
          }
        }
      );

  }, []);
  return axiosSecure;
};
export default useAxiosSecure;
