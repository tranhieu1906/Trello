import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CreateBoard from "../components/board/CreateBoard";
import PositionedMenu from "../components/board/Option";
import axios from "../api/axios";
import Divider from "@mui/material/Divider";
import { getBoards } from "../services/board/boardAction";
import { getUser } from "../services/user/userService";
function Home() {
  const { loading, error } = useSelector((state) => state.board);
  const { socket } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [boardGroups, setBoardGroups] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios.get("/boards").then((res) => {
      setBoards(res.data);
    });
  }, []);

  useEffect(() => {
    socket?.on("new-notifications", (data) => {
      axios.get("/boards").then((res) => {
        setBoards(res.data);
      });
    });
    socket?.on("update-board-list", (data) => {
      axios.get("/boards").then((res) => {
        setBoards(res.data);
      });
    });
  }, []);

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
        <div className="w-full">
          <Divider varant="inset" component="li">
            <h1> Cắc bảng của Bạn</h1>
          </Divider>
        </div>
        {loading && <CircularProgress className="m-10" />}
        <div className="m-2 flex flex-row flex-wrap items-center justify-center gap-4">
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
        <br />
        <div className="w-full">
          <Divider varant="inset" component="li">
            <h1> Cắc bảng bạn được thêm vào</h1>
          </Divider>
        </div>
        <div className="m-2 flex flex-row flex-wrap items-center justify-center gap-4">
          {boardGroups.map((board) => (
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
        </div>
      </section>
    </div>
  );
}

export default Home;
