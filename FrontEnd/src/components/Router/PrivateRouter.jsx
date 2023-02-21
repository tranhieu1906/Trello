import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  return (
    <>
      {localStorage.getItem("userToken") ? children : <Navigate to="/login" />}
    </>
  );
};

export default PrivateRoute;
