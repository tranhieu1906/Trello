import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteBoard } from "../../services/board/boardAction";
import { useSelector } from "react-redux";
import { getDataProject } from "../../services/project/projectService";
export default function PositionedMenu({
  boardId,
  updateBoard,
  project,
  dataBoard,
}) {
  const { socket, userInfo } = useSelector((state) => state.auth);
  const [role, setRole] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (dataBoard.owner === userInfo._id) {
      setRole("admin");
    } else if (
      dataBoard.members.some((member) => member.user === userInfo._id)
    ) {
      setRole("guest");
    } else {
      setRole("outsider");
    }
  });

  const handleDelete = async (boardId) => {
    if (window.confirm("Bạn đồng ý xóa bảng này ?")) {
      let data = {
        userId: userInfo._id,
        boardId: boardId,
      };
      socket?.emit("board-drop", data);
      await deleteBoard(boardId);
      getDataProject(project).then((res) => {
        updateBoard(res.data);
      });
      setAnchorEl(null);
    }
  };

  return (
    <div>
      <Button
        style={{ width: 20, height: 25 }}
        className="z-20 hover:z-50"
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon style={{ color: "white", width: 240 }} />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {role === "admin" ? (
          <MenuItem onClick={() => handleDelete(boardId)}>Xóa bảng</MenuItem>
        ) : role === "guest" ? (
          <MenuItem>Rời bảng</MenuItem>
        ) : (
          <MenuItem>xem bảng</MenuItem>
        )}
      </Menu>
    </div>
  );
}
