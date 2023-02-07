import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/other/Navbar";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { boards, loading } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getBoards());
  // }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";
  }, []);



  return (
    <div >
      <Navbar />
      <section className="flex flex-col items-center p-12">
        <h1>Welcome {userInfo && userInfo.name}</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className="m-10" />}
        <div className="m-2 flex flex-row flex-wrap items-center justify-center">
           {boards.map((board) => (
            <Link
              key={board._id}
              to={`/board/${board._id}`}
              className="w-52 h-32 m-5 no-underline font-medium text-white rounded-xl "
                style={{backgroundImage:`url("${board.backgroundURL}")`}}
            >
              {board.title}
            </Link>
          ))}
          {/* <CreateBoard /> */}
        </div>
      </section>
    </div>
  );
}

export default Home;
