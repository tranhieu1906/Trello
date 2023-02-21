import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import CreateBoard from "../components/board/CreateBoard";
import PositionedMenu from "../components/board/Option";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import axios from "../api/axios";
import Divider from "@mui/material/Divider";
import { getBoards } from "../services/board/boardAction";
import { getUser } from "../services/user/userService";
import { Avatar, ListItem, ListItemAvatar, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import { getListProject } from "../services/project/projectService";

function Home() {
  const { loading, error } = useSelector((state) => state.board);
  const { socket } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [boardGroups, setBoardGroups] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) dispatch(getBoards());
    getListProject().then((res) => {
      if (res.data[0]._id) {
        navigate(`/w/${res.data[0]._id}/home`);
      }
    });

  }, []);

  // useEffect(() => {
  //   axios.get("/boards").then((res) => {
  //     setBoards(res.data);
  //   });
  // }, []);

  // socket?.on("new-notifications", (data) => {
  //   axios.get("/boards").then((res) => {
  //     setBoards(res.data);
  //   });
  // });
  // socket?.on("update-board-list", (data) => {
  //   axios.get("/boards").then((res) => {
  //     setBoards(res.data);
  //   });
  // });

  // useEffect(() => {


  // }, [dispatch]);

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
    <>
      <Typography variant="h6" ml={1} mt={5} component="div" sx={{ fontWeight: 'bold' }}>KHÔNG GIAN LÀM VIỆC CỦA BẠN</Typography>
      <Typography variant="body1" ml={1} mt={3} component="div" >
        Bạn chưa phải là thành viên của bất kỳ không gian làm việc nào. 
        <Link to="/"  className="underline hover:text-red-600" >
          Tạo không gian làm việc
        </Link>
      </Typography>
    </>

    // <div>
    //   <section
    //     className="flex flex-col items-center p-12"
    //     style={{ paddingTop: 20 }}
    //   >
    //     <div className="w-full">
    //       <ListItem
    //         style={{ paddingBottom: 25, paddingTop: 0, paddingLeft: 0 }}
    //       >
    //         <ListItemAvatar style={{ marginRight: 20 }}>
    //           <Avatar sx={{ width: 60, height: 60 }} variant="square">
    //             <WorkIcon />
    //           </Avatar>
    //         </ListItemAvatar>
    //         <ListItemText primary={<b>Dự án vip</b>} secondary="Riêng tư" />
    //       </ListItem>
    //     </div>
    //     <div className="w-full">
    //       <Divider varant="inset" />
    //     </div>
    //     <div className="w-full text-left">
    //       <PersonIcon style={{ width: 40, height: 40 }} />
    //       <b style={{ marginLeft: 15 }}>Các bảng của Bạn</b>
    //     </div>
    //     {loading && <CircularProgress className="m-10" />}
    //     <div className="m-2  items-center justify-center grid grid-cols-3 gap-4">
    //       {boards.map((board, index) => (
    //         <div
    //           key={index}
    //           className="w-60 h-24 m-5 no-underline font-medium text-white rounded-xl bg-cover z-0"
    //           style={{ backgroundImage: `url("${board.backgroundURL}")` }}
    //         >
    //           <Link to={`/board/${board._id}`}>
    //             <h2 className="indent-2.5" style={{ height: 70 }}>
    //               {board.title}
    //             </h2>
    //           </Link>
    //           <div className="backdrop-brightness-50 rounded-full">
    //             <PositionedMenu boardId={board._id} updateBoard={updateBoard} />
    //           </div>
    //         </div>
    //       ))}
    //       <Button
    //         onClick={handleClickOpen}
    //         style={{
    //           backgroundColor: "darkgrey",
    //           marginLeft: 20,
    //           borderRadius: 13,
    //           color: "white",
    //         }}
    //         className="w-60 h-24 m-5 no-underline font-medium text-white bg-cover"
    //       >
    //         Tạo bảng mới
    //       </Button>
    //       {
    //         <CreateBoard
    //           open={open}
    //           handleClose={handleClose}
    //           updateBoard={updateBoard}
    //         />
    //       }
    //     </div>
    //     <br />
    //     <div className="w-full text-left">
    //       <GroupIcon style={{ width: 40, height: 40 }} />
    //       <b style={{ marginLeft: 15 }}>Bảng bạn được thêm vào</b>
    //       {/*<Divider varant="inset" component="li"/>*/}
    //     </div>
    //     <div className="m-2 flex flex-row flex-wrap items-center justify-center gap-4">
    //       {boardGroups.map((board) => (
    //         <div
    //           key={board._id}
    //           className="w-60 h-24 m-5 no-underline font-medium text-white rounded-xl bg-cover z-0"
    //           style={{ backgroundImage: `url("${board.backgroundURL}")` }}
    //         >
    //           <Link to={`/board/${board._id}`}>
    //             <h2 className="indent-2.5" style={{ height: 70 }}>
    //               {board.title}
    //             </h2>
    //           </Link>
    //           <div className="backdrop-brightness-50 rounded-full">
    //             <PositionedMenu boardId={board._id} updateBoard={updateBoard} />
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </section>
    // </div>
  );
}

export default Home;
