import axios from "./api/axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Home from "./page/Home";
import Board from "./page/Board";
import Layout from "./components/Layout.jsx/Layout";
import PrivateRoute from "./components/Router/PrivateRouter";

function App() {
  if (localStorage.getItem("userToken")) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("userToken");
  }
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
        </Route>
        <Route
          path="/board/:id"
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
