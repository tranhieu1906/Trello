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
import FormControl from "@mui/material/FormControl";
import HandleInput from "./HandleInput";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { changeRole, removeMember } from "../../services/board/boardAction";
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

  const handleChange = (data) => {
    // dispatch(changeRole(data));
  };

  const handleOut = (id) => {
    if (roleMemberLoginInBoard === "admin") {
      if (window.confirm("Bạn có muốn xóa người dùng này ra khỏi bảng !")) {
        // dispatch(removeMember(id));
      }
    } else if (roleMemberLoginInBoard === "observer") {
      if (window.confirm("Bạn có muốn rơì khỏi bảng này !")) {
        // dispatch(removeMember(id));
      }
    }
  };

  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
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
            <HandleInput project={project} members={members} />
          </div>
          {/*<div>*/}
          {/*  {members.map((member) => (*/}
          {/*    <div className="flex items-center mt-3" key={member.user._id}>*/}
          {/*      <Avatar className="mr-2 cursor-default bg-white my-3">*/}
          {/*        {getInitials(member.user.name)}*/}
          {/*      </Avatar>*/}
          {/*      <div className="flex flex-col" style={{ minWidth: "300px" }}>*/}
          {/*        <span>{member.user.name}</span>*/}
          {/*        <span>{member.user.email}</span>*/}
          {/*      </div>*/}
          {/*      <div className="ml-4">*/}
          {/*        <Box sx={{ minWidth: 200 }}>*/}
          {/*          <FormControl fullWidth>*/}
          {/*            <InputLabel id="demo-simple-select-label">*/}
          {/*              Vai trò*/}
          {/*            </InputLabel>*/}
          {/*            <Select*/}
          {/*              labelid="demo-simple-select-label"*/}
          {/*              id="demo-simple-select"*/}
          {/*              value={member.role}*/}
          {/*              label="Vai trò"*/}
          {/*              onChange={(e) =>*/}
          {/*                handleChange({*/}
          {/*                  userId: member.user._id,*/}
          {/*                  role: e.target.value,*/}
          {/*                })*/}
          {/*              }*/}
          {/*            >*/}
          {/*              <MenuItem*/}
          {/*                disabled={roleMemberLoginInBoard === "observer"}*/}
          {/*                value={"admin"}*/}
          {/*              >*/}
          {/*                Quản trị viên*/}
          {/*              </MenuItem>*/}
          {/*              <MenuItem*/}
          {/*                disabled={*/}
          {/*                  roleMemberLoginInBoard === "observer" ||*/}
          {/*                  (roleMemberLoginInBoard === "admin" &&*/}
          {/*                    member.user._id === userInfo._id)*/}
          {/*                }*/}
          {/*                value={"observer"}*/}
          {/*              >*/}
          {/*                Thành viên*/}
          {/*              </MenuItem>*/}

          {/*              {roleMemberLoginInBoard === "observer" ? (*/}
          {/*                <MenuItem*/}
          {/*                  onClick={() => handleOut(member.user._id)}*/}
          {/*                  disabled={member.user._id !== userInfo._id}*/}
          {/*                >*/}
          {/*                  Rời khỏi bảng*/}
          {/*                </MenuItem>*/}
          {/*              ) : (*/}
          {/*                <MenuItem*/}
          {/*                  onClick={() => handleOut(member.user._id)}*/}
          {/*                  disabled={*/}
          {/*                    roleMemberLoginInBoard === "admin" &&*/}
          {/*                    member.user._id === userInfo._id*/}
          {/*                  }*/}
          {/*                >*/}
          {/*                  Xóa khỏi bảng*/}
          {/*                </MenuItem>*/}
          {/*              )}*/}
          {/*            </Select>*/}
          {/*          </FormControl>*/}
          {/*        </Box>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  ))}*/}
          {/*</div>*/}
          <DialogContentText></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
