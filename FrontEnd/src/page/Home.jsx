import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getBoards } from "../services/user/board/boardAction";
import { getUser } from "../services/user/userService";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { boards, loading, error } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userToken")) dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";
    dispatch(getUser());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <section className="flex flex-col items-center p-12">
        <h1>Welcome {userInfo && userInfo.name}</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className="m-10" />}
      </section>
    </div>
  );
}

export default Home;
