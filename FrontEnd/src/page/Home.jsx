import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useGetDetailsQuery } from "../services/auth/authService";
import { getBoards } from "../services/board/boardAction";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { boards, loading, error } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const { data } = useGetDetailsQuery("userDetails");
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

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
      <section className="flex flex-col items-center p-12">
        <h1>Welcome {userInfo && userInfo.name}</h1>
        <h2>Your Boards</h2>
        {loading && <CircularProgress className="m-10" />}
      </section>
    </div>
  );
}

export default Home;
