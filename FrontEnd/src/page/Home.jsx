
import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useGetDetailsQuery } from "../services/auth/authService";
import { getBoards } from "../services/board/boardAction";
import Button from "@mui/material/Button";
import CreateBoard from "../components/board/CreateBoard"
import axios from "../api/axios";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { boards, loading, error } = useSelector((state) => state.board);
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  console.log(boards)
  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const { data } = useGetDetailsQuery("userDetails");
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) dispatch(getBoards());
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
        <Button variant="outlined" onClick={handleClickOpen}>
          Board New
        </Button>
        {loading && <CircularProgress className="m-10" />}
        <div className="m-2 flex flex-row flex-wrap items-center justify-center grid grid-cols-4 gap-4">
           {boards.map((board) => (
            <Link
              key={board._id}
              to={`/board/${board._id}`}
              className="w-60 h-24 m-5 no-underline font-medium text-white rounded-xl bg-cover"
                style={{backgroundImage:`url("${board.backgroundURL}")`}}
            >
              <h2 className="indent-2.5">{board.title}</h2>
            </Link>
          ))}
          { <CreateBoard
              open={open}
              handleClose={handleClose}
          /> }
        </div>
      </section>
    </div>
  );
}

export default Home;
