import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../components/other/Navbar";
import { toast } from "react-toastify";

import { getBoards } from "../services/board/boardAction";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { boards, loading, error } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
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
              style={{ backgroundColor: "#5067c5" }}
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
