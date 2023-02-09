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
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
  const [inviting, setInviting] = useState(false);

  const { members } = useSelector((state) => state.board.board);

  const { userInfo } = useSelector((state) => state.auth);

  const handleClose = () => {
    setInviting(false);
  };
  const handleChange = (event) => {};
  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  };
  const handleOut = () => {
    if (window.confirm("asdna")) {
    }
  };

  return (
    <div className="flex flex-wrap my-0 mx-5 gap-4">
      <div className="flex flex-wrap">
        <AvatarGroup max={4}>
          {members.map((member) => {
            return (
              <Tooltip title={member.name} key={member.user._id}>
                <Avatar className="mr-0.5 cursor-default bg-white">
                  {getInitials(member.user.name)}
                </Avatar>
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
          Invite
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
            <DialogContent dividers>
              <div className="flex gap-2 items-center">
                <CustomizedHook handleClose={handleClose} />
              </div>
              <div>
                {members.map((member) => (
                  <div className="flex items-center mt-3" key={member.user._id}>
                    <Avatar className="mr-2 cursor-default bg-white my-3">
                      {getInitials(member.user.name)}
                    </Avatar>
                    <div className="flex flex-col">
                      <span>{member.user.name}</span>
                      <span>{member.user.email}</span>
                    </div>
                    <div className="ml-4">
                      <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Role
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={member.role}
                            label="Role"
                            onChange={handleChange}
                          >
                            <MenuItem value={"admin"}>Admin</MenuItem>
                            <MenuItem value={"observer"}>Observer</MenuItem>
                            {member.role === "admin" ? (
                              <MenuItem
                                onClick={handleOut}
                                disabled={
                                  userInfo._id !== member.user._id ||
                                  member.role === "admin"
                                }
                              >
                                left from board
                              </MenuItem>
                            ) : (
                              <MenuItem
                                onClick={handleOut}
                              >
                                Remove from board
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
