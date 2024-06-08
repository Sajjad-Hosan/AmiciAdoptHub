import { Navigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const [isAdmin] = useAdmin();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }
  if (isAdmin) {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
};
AdminRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminRoute;
