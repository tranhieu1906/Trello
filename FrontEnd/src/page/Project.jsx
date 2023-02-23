import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CreateBoard from "../components/board/CreateBoard";
import PositionedMenu from "../components/board/Option";
import { getProject } from "../redux/features/project/projectSlice";
import { getBoards } from "../services/board/boardAction";
import { getDataProject } from "../services/project/projectService";
import { getUser } from "../services/user/userService";

function Project() {
  const { socket, userInfo } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.board);
  const [project, setProject] = useState({});
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const params = useParams();
  const [boardGroups, setBoardGroups] = useState([]);
  const dispatch = useDispatch();
  const getInitials = (name) => {
    let initials = name?.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateData = () => {
    getDataProject(params).then((res) => {
      let myBoard = [];
      let otherBoard = [];
      let boards = res.data.boards;
      boards.map((board) => {
        if (board.owner === userInfo?._id) {
          myBoard.push(board);
        } else {
          otherBoard.push(board);
        }
        
      });
      setProject(res.data.project);
      setBoards(myBoard);
      setBoardGroups(otherBoard);
    });
  };

  useEffect(() => {
    updateData();
    dispatch(getProject(params.id));
  }, [params]);

  socket?.on("new-notifications", (data) => {
    updateData();
  });

  socket?.on("update-board-list", (data) => {
    updateData();
  });

  useEffect(() => {
    if (localStorage.getItem("userToken")) dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";

    dispatch(getUser());
  }, [dispatch]);

  const updateBoard = (data) => {
    if (data.project._id === params.id) {
      setProject(data.project);
      setBoards(data.boards);
    }
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
      <section className="flex flex-col p-12" style={{ paddingTop: 20 }}>
        <div className="w-full">
          <ListItem
            style={{ paddingBottom: 25, paddingTop: 0, paddingLeft: 0 }}
          >
            <ListItemAvatar style={{ marginRight: 20 }}>
              <Avatar
                sx={{ width: 60, height: 60 }}
                variant="square"
                style={{
                  background: "linear-gradient( #403294,#0747a6)",
                  borderRadius: "4px",
                }}
              >
                <b>{getInitials(project?.name)}</b>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<b>{project.name}</b>}
              secondary={project.permission}
            />
          </ListItem>
        </div>
        <div className="w-full">
          <Divider varant="inset" />
        </div>
        <div className="w-full text-left">
          <PersonIcon style={{ width: 40, height: 40 }} />
          <b style={{ marginLeft: 15 }}>Các bảng của Bạn</b>
        </div>
        <div className="m-2 items-center justify-center grid grid-cols-3 gap-4">
          {boards.map((board, index) => (
            <div
              key={index}
              className="w-60 h-24 m-5 no-underline font-medium text-white rounded-xl bg-cover z-0"
              style={{ backgroundImage: `url("${board.backgroundURL}")` }}
            >
              <Link to={`/board/${board._id}`}>
                <h2 className="indent-2.5" style={{ height: 70 }}>
                  {board.title}
                </h2>
              </Link>
              <div className="backdrop-brightness-50 rounded-full">
                <PositionedMenu
                  dataBoard={board}
                  boardId={board._id}
                  project={params}
                  updateBoard={updateBoard}
                  updateData={updateData}
                />
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
              updateBoard={updateData}
              projectObject={project}
            />
          }
        </div>
        <div className="w-full text-left">
          <Divider varant="inset" component="" />
          <GroupIcon style={{ width: 40, height: 40 }} />
          <b style={{ marginLeft: 15 }}>Bảng khác</b>
        </div>
        <div className="m-2 items-center justify-center grid grid-cols-3 gap-4">
          {boardGroups.length > 0 ? (
            boardGroups.map((board) => (
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
                  <PositionedMenu
                    dataBoard={board}
                    boardId={board._id}
                    updateData={updateData}
                  />
                </div>
              </div>
            ))
          ) : (
            <b style={{ paddingRight: 110 }}>Hiện không có bảng nào khác</b>
          )}
        </div>
      </section>
    </div>
  );
}

export default Project;
