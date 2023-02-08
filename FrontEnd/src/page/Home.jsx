import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import {getBoardData} from "../services/board/boardAction";
import { getBoards } from "../services/board/boardAction";
import Button from "@mui/material/Button";
import CreateBoard from "../components/board/CreateBoard"
import PositionedMenu from "../components/board/Option"

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.board);
  const [open, setOpen] = useState(false)
  const [boards, setBoards] = useState([])
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false)
  }

  const updateBoard = (data) => {
    setBoards(data)
  }

  useEffect(async () => {
    let listBoards = await getBoardData()
    setBoards(listBoards)
    dispatch(getBoards());
  },[])

  const handleClickOpen = () => {
    setOpen(true)
  }

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
        <div className="m-2 flex flex-row flex-wrap items-center justify-center grid grid-cols-4 gap-4">
           {boards.map((board) => (
               <div   key={board._id}  className="w-60 h-24 m-5 no-underline font-medium text-white rounded-xl bg-cover z-0"
                      style={{backgroundImage:`url("${board.backgroundURL}")`}}>
                   <Link
                       to={`/board/${board._id}`}
                   >
                     <h2 className="indent-2.5" style={{height: 70}}>{board.title}</h2>
                   </Link>
                 <div className="backdrop-brightness-50 rounded-full">
                   <PositionedMenu
                    boardId = {board._id}
                    updateBoard = {updateBoard}
                   />
                 </div>
               </div>

          ))}
          <Button onClick={handleClickOpen } style={{
            backgroundColor: "darkgrey",
            marginLeft: 20
          }}  className="w-60 h-24 m-5 no-underline font-medium text-white rounded-xl bg-cover"></Button>
          { <CreateBoard
              open={open}
              handleClose={handleClose}
              updateBoard = {updateBoard}
              boards = {boards}
          /> }
        </div>
      </section>
    </div>
  );
}

export default Home;
