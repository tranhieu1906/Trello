import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HandleInput from "./HandleInput";
import { useSelector } from "react-redux";

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
