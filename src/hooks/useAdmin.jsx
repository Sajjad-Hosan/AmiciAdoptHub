import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  useEffect(() => {
    axiosSecure.get(`/user_status/?email=${user?.email}`).then((res) => {
      setIsAdmin(res.data?.isAdmin);
    });
  }, [axiosSecure, user?.email]);
  return [isAdmin];
};

export default useAdmin;
