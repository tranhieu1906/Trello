import axios from "../../api/axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addMember } from "../../actions/board";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import  CustomizedHook  from "./Autocomplete";

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
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const boardMembers = useSelector((state) => state.board.board.members);
  const searchOptions = users.filter((user) =>
    boardMembers.find((boardMember) => boardMember.user === user._id)
      ? false
      : true
  );
  const handleClose = () => {
    setInviting(false);
  };
  const dispatch = useDispatch();

  const getInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  };

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue && newInputValue !== "") {
      const search = (await axios.get(`/users/${newInputValue}`)).data.slice(
        0,
        5
      );
      setUsers(search && search.length > 0 ? search : []);
    }
  };

  const onSubmit = async () => {
    // dispatch(addMember(user._id));
    setUser(null);
    setInputValue("");
    setInviting(false);
  };

  return (
    <div className="flex flex-wrap my-0 mx-5 gap-4">
      <div className="flex flex-wrap">
        {boardMembers.map((member) => {
          return (
            <Tooltip title={member.name} key={member.user}>
              <Avatar className="avatar">
                {getInitials(member.user.name)}
              </Avatar>
            </Tooltip>
          );
        })}
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
              <CustomizedHook/>
              <Typography gutterBottom>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur
                et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus
                dolor auctor.
              </Typography>
              <Typography gutterBottom>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                cursus magna, vel scelerisque nisl consectetur et. Donec sed
                odio dui. Donec ullamcorper nulla non metus auctor fringilla.
              </Typography>
            </DialogContent>
          </BootstrapDialog>
        </div>
      )}
    </div>
  );
};

export default Members;

{
  /* <div className="ml-3 flex flex-wrap">
          <Autocomplete
            value={user}
            onChange={(e, newMember) => setUser(newMember)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) =>
              handleInputValue(newInputValue)
            }
            options={searchOptions}
            getOptionLabel={(member) => member.email}
            className="w-64 h-2.5 mr-3"
            renderInput={(params) => (
              <TextField
                {...params}
                helperText="Search for user by email"
                autoFocus
              />
            )}
          />
          <div className="add-member">
            <Button
              disabled={!user}
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Add Member
            </Button>
            <Button onClick={() => setInviting(false)}>
              <CloseIcon />
            </Button>
          </div>
        </div> */
}
