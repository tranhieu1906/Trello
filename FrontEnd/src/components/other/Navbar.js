import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav style={{ backgroundColor: "#026aa7" }} className="flex flex-row justify-between p-3">
      <Link to="/dashboard">Home</Link>
      <Link to="/dashboard">TrelloClone</Link>
      <Link to="/" onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
