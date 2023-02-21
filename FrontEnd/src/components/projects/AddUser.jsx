import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FormControl from "@mui/material/FormControl";
import HandleInput from "./HandleInput";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { changeRole, removeMember } from "../../services/board/boardAction";
import { useSelector } from "react-redux";
import { ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import List from "@mui/material/List";

function ImageIcon() {
  return null;
}

export default function FormDialog({ project }) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [roleMemberLoginInBoard, setRoleMemberLoginInBoard] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setMembers([...members, project.members]);
  }, [project]);
  useEffect(() => {
    let userLoginInMember = members.filter(
      (member) => member.user._id === userInfo._id
    );
    if (userLoginInMember.length > 0) {
      setRoleMemberLoginInBoard(userLoginInMember[0].role);
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleClickOpen}>
        <PersonAddIcon />
        Thêm thành viên
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Mời vào không gian làm việc</DialogTitle>
        <DialogContent>
          <div className="flex gap-2 items-center">
            <HandleInput
              handleClose={handleClose}
              project={project}
              members={members}
            />
          </div>
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
