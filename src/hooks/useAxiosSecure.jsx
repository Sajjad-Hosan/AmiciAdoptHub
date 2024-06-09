import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://amici-adopt-hub-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
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
          signOutUser().then(() => {
            navigate("/login");
          });
        }
      }
    );
  }, [navigate, signOutUser]);
  return axiosSecure;
};
export default useAxiosSecure;
