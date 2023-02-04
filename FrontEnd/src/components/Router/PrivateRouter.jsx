import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { userInfo } = useSelector(state => state.auth);

    return (
      <>
        {!userInfo &&
          (!localStorage.getItem("userToken") ? (
            <Navigate to="/login" />
          ) : (
            children
          ))}
      </>
    );
};

export default PrivateRoute;