import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      {localStorage.getItem("userToken") ? children : <Navigate to="/login" />}
    </>
  );
};

export default PrivateRoute;
