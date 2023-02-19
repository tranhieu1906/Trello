import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FormControl from "@mui/material/FormControl";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [ketWord, setKetWord] = useState("");
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
          <FormControl fullWidth sx={{ m: 1, minWidth: 400 }} size="small">
            <TextField
              fullWidth
              placeholder="Địa trỉ email hoạc tên"
              name="name"
              type="text"
              value={ketWord}
              onChange={(e) => setKetWord(e.target.value)}
            />
          </FormControl>
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
