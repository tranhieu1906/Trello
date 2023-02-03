import { Route, Routes } from "react-router-dom";
import Login from "./components/page/Login";
import SignUp from "./components/page/SignUp";
import axios from "axios";
import { useEffect } from "react";


function App() {
  useEffect(()=>{
    axios.defaults.baseURL = "http://localhost:8000";
  },[])
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
