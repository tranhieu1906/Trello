import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../services/board/boardAction";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const DeleteCard = ({ cardId, setOpen, list }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onDeleteCard = async () => {
    let listId = list._id;
    dispatch(deleteCard({ listId, cardId }));
    setOpenDialog(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        Xóa Thẻ
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn có xác nhận là muốn xóa thẻ này?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xóa thẻ này sẽ không thể khôi phục và những người được gắn vào thẻ
            sẽ mất.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy bỏ</Button>
          <Button onClick={onDeleteCard} autoFocus color="error">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  list: PropTypes.object.isRequired,
};

export default DeleteCard;
