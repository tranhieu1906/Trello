import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import Layout from "../components/Layout.jsx/Layout";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { boards, loading } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(getBoards());
  // }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";
  }, []);



  return (
    <div >
      <section className="flex flex-col items-center p-12">
        <h1>Welcome {userInfo && userInfo.name}</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className="m-10" />}
      </section>

    </div>
  );
}

export default Home;
