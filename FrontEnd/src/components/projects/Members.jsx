import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { getDataProject } from "../../services/project/projectService";
import List from "@mui/material/List";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";

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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Members({ project }) {
  const [open, setOpen] = React.useState(false);
  const [members, setMembers] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      let params = { id: project._id };
      getDataProject(params).then((res) => {
        setMembers(res.data.project.members);
      });
    }
  }, [open]);
  return (
    <div>
      <div style={{ color: "black" }} onClick={handleClickOpen}>
        <PeopleIcon />
        Thành viên
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          style={{ width: 500 }}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Thành viên trong không gian làm việc
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {members.map((member, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={member.user.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={member.user.name}
                  secondary={member.user.email}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        {/*<DialogActions>*/}
        {/*<Button autoFocus onClick={handleClose}>*/}
        {/*  Save changes*/}
        {/*</Button>*/}
        {/*</DialogActions>*/}
      </BootstrapDialog>
    </div>
  );
}
