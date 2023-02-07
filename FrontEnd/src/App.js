import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import Home from "./page/Home";
import Layout from "./components/Layout.jsx/Layout";
import PrivateRoute from "./components/Router/PrivateRouter";

function App() {
  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:8000";
  }, []);
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
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
        >
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
