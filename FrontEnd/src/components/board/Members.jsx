import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMember } from "../../services/board/boardAction";
import { changeRole } from "../../services/board/boardAction";

import { styled } from "@mui/material/styles";
import CustomizedHook from "./Autocomplete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const Members = () => {
  const dispatch = useDispatch();
  const [inviting, setInviting] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { members, owner } = useSelector((state) => state.board.board);
  const [roleMeberLoginInBoard, setRoleMeberLoginInBoard] = useState();

  useEffect(() => {
    let userLoginInMember = members.filter(
      (member) => member.user._id === userInfo?._id
    );
    setRoleMeberLoginInBoard(userLoginInMember[0].role);
  }, [members, userInfo?._id]);

  const handleClose = () => {
    setInviting(false);
  };

  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  };
  const handleOut = (id) => {
    if (roleMeberLoginInBoard === "admin") {
      if (window.confirm("Bạn có muốn xóa người dùng này ra khỏi bảng !")) {
        dispatch(removeMember(id));
      }
    } else {
      if (window.confirm("Bạn có muốn rơì khỏi bảng này !")) {
        dispatch(removeMember(id));
      }
    }
  };
  const handleChange = (data) => {
    dispatch(changeRole(data));
  };

  return (
    <div className="flex flex-wrap my-0 mx-5 gap-4">
      <div className="flex flex-wrap">
        <AvatarGroup max={4}>
          {members.map((member) => {
            return (
              <Tooltip title={member.name} key={member.user._id}>
                {member.user.avatar ? (
                  <Avatar
                    className="mr-0.5 cursor-default bg-white"
                    alt="Avatar"
                    src={member.user.avatar}
                  />
                ) : (
                  <Avatar
                    alt="Avatar"
                    className="mr-0.5 cursor-default bg-white"
                  >
                    {getInitials(member.user.name)}
                  </Avatar>
                )}
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </div>
      {!inviting ? (
        <Button
          className="ml-3 flex flex-wrap"
          variant="contained"
          onClick={() => setInviting(true)}
        >
          Chia sẻ bảng
        </Button>
      ) : (
        <div>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={inviting}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              Chia sẻ bảng
            </BootstrapDialogTitle>
            <DialogContent dividers style={{ minHeight: "300px" }}>
              <div className="flex gap-2 items-center">
                <CustomizedHook
                  handleClose={handleClose}
                  membersInBoard={members}
                />
              </div>
              <div>
                {members.map((member) => (
                  <div className="flex items-center mt-3" key={member.user._id}>
                    {member.user.avatar ? (
                      <Avatar
                        className="mr-2 cursor-default bg-white my-3"
                        alt="Avatar"
                        src={member.user.avatar}
                      />
                    ) : (
                      <Avatar
                        alt="Avatar"
                        className="mr-2 cursor-default bg-white my-3"
                      >
                        {getInitials(member.user.name)}
                      </Avatar>
                    )}
                    <div
                      className="flex flex-col"
                      style={{ minWidth: "300px" }}
                    >
                      <span>{member.user.name}</span>
                      <span>{member.user.email}</span>
                    </div>
                    <div className="ml-4">
                      <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Vai trò
                          </InputLabel>
                          <Select
                            labelid="demo-simple-select-label"
                            id="demo-simple-select"
                            value={member.role}
                            label="Vai trò"
                            onChange={(e) =>
                              handleChange({
                                userId: member.user._id,
                                role: e.target.value,
                              })
                            }
                          >
                            <MenuItem
                              disabled={roleMeberLoginInBoard === "observer"}
                              value={"admin"}
                            >
                              Quản trị viên
                            </MenuItem>
                            <MenuItem
                              disabled={
                                roleMeberLoginInBoard === "observer" ||
                                (roleMeberLoginInBoard === "admin" &&
                                  member.user._id === userInfo._id) ||
                                owner === member.user._id
                              }
                              value={"observer"}
                            >
                              Thành viên
                            </MenuItem>

                            {member.user._id === userInfo._id ? (
                              <MenuItem
                                onClick={() => handleOut(member.user._id)}
                                disabled={
                                  member.user._id !== userInfo._id ||
                                  owner === member.user._id
                                }
                              >
                                Rời khỏi bảng
                              </MenuItem>
                            ) : (
                              <MenuItem
                                onClick={() => handleOut(member.user._id)}
                                disabled={
                                  roleMeberLoginInBoard === "observer" ||
                                  (roleMeberLoginInBoard === "admin" &&
                                    member.user._id === userInfo._id) ||
                                  owner === member.user._id
                                }
                              >
                                Xóa khỏi bảng
                              </MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </BootstrapDialog>
        </div>
      )}
    </div>
  );
};

export default Members;
