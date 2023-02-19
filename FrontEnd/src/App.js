import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import axios from "./api/axios";
import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/Router/PrivateRouter";
import Board from "./page/Board";
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import PasswordChange from "./components/other/PasswordChange";
import ManagerProfile from "./components/other/ManagerProfile";
import LayoutManagerProfie from "./components/Layout/LayoutManagerProfie";
import { useSelector } from "react-redux";
import Project from "./page/Project";

function App() {
  const navigate = useNavigate();
  const { socket, userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("userToken");
    }
  }, [navigate]);

  if (localStorage.getItem("userToken")) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("userToken");
  }

  useEffect(() => {
    if (userInfo !== null) {
      socket?.emit("setup", userInfo);
    }
  }, [userInfo, socket]);

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route
            path="/w/:id/home"
            element={
              <PrivateRoute>
                <Project />
              </PrivateRoute>
            }
          />
          {/*<Route path="user" element={<ManagerProfile />} />*/}
        </Route>
        <Route
          path="/manager-profile"
          element={
            <PrivateRoute>
              <LayoutManagerProfie />
            </PrivateRoute>
          }
        >
          <Route index element={<ManagerProfile />} />
          <Route path="password" element={<PasswordChange />} />
          <Route path="user" element={<ManagerProfile />} />
        </Route>
        <Route
          path="/board/:id"
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
        {/*<Route*/}
        {/*  path="/project/:id"*/}
        {/*  element={*/}
        {/*    <PrivateRoute>*/}
        {/*      <Project />*/}
        {/*    </PrivateRoute>*/}
        {/*  }*/}
        {/*/>*/}
      </Routes>
    </>
  );
}

export default App;
