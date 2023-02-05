import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetDetailsQuery } from "../../services/auth/authService";
import { logout, setCredentials } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const { data } = useGetDetailsQuery("userDetails");
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <nav
      style={{ backgroundColor: "#026aa7" }}
      className="flex flex-row justify-between p-3"
    >
      <Link to="/dashboard">Home</Link>
      <Link to="/dashboard">TrelloClone</Link>
      <Link to="/" onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
