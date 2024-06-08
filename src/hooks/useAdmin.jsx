import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const AxiosPublic = useAxiosPublic();
  const { user, loading } = useAuth();
  const { data: isAdmin, isPending: adminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosPublic.get(`/user_status/?email=${user?.email}`);
      return res.data?.isAdmin;
    },
  });
  return [isAdmin, adminLoading];
};

export default useAdmin;
