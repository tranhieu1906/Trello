import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";
import CreateBoard from "../components/board/CreateBoard";
import PositionedMenu from "../components/board/Option";
import { getBoards } from "../services/user/board/boardAction";
import { getUser } from "../services/user/userService";
function Home() {
  const { loading, error } = useSelector((state) => state.board);
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";

    dispatch(getUser());
  }, [dispatch]);

  const updateBoard = (data) => {
    setBoards(data);
  };

  useEffect(() => {
    axios.get("/boards").then((res) => {
      setBoards(res.data);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <section className="flex flex-col items-center p-12">
        {loading && <CircularProgress className="m-10" />}
        <div className="m-2 flex flex-row flex-wrap items-center justify-center grid grid-cols-4 gap-4">
          {boards.map((board) => (
            <div
              key={board._id}
              className="w-60 h-24 m-5 no-underline font-medium text-white rounded-xl bg-cover z-0"
              style={{ backgroundImage: `url("${board.backgroundURL}")` }}
            >
              <Link to={`/board/${board._id}`}>
                <h2 className="indent-2.5" style={{ height: 70 }}>
                  {board.title}
                </h2>
              </Link>
              <div className="backdrop-brightness-50 rounded-full">
                <PositionedMenu boardId={board._id} updateBoard={updateBoard} />
              </div>
            </div>
          ))}
          <Button
            onClick={handleClickOpen}
            style={{
              backgroundColor: "darkgrey",
              marginLeft: 20,
              borderRadius: 13,
              color: "white",
            }}
            className="w-60 h-24 m-5 no-underline font-medium text-white bg-cover"
          >
            Tạo bảng mới
          </Button>
          {
            <CreateBoard
              open={open}
              handleClose={handleClose}
              updateBoard={updateBoard}
            />
          }
        </div>
      </section>
    </div>
  );
}

export default Home;
