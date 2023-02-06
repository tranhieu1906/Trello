import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
// import { moveList } from "../../actions/board";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useStyles from "../../utils/dialogStyles";

const MoveList = ({ listId, closeMenu }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const lists = useSelector((state) => state.board.board.lists);
  const listObjects = useSelector((state) => state.board.board.listObjects);
  const dispatch = useDispatch();

  useEffect(() => {
    const mappedListObjects = listObjects
      .sort(
        (a, b) =>
          lists.findIndex((id) => id === a._id) -
          lists.findIndex((id) => id === b._id)
      )
      .map((list, index) => ({ list, index }));
    setPositions(
      mappedListObjects
        .filter((list) => !list.list.archived)
        .map((list) => list.index)
    );
    setPosition(
      mappedListObjects.findIndex((list) => list.list._id === listId)
    );
  }, [lists, listId, listObjects]);

  const onSubmit = async () => {
    // dispatch(moveList(listId, { toIndex: position }));
    setOpenDialog(false);
    closeMenu();
  };

  return (
    <Fragment>
      <div onClick={() => setOpenDialog(true)}>Move This List</div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className={classes.moveListTop}>
          <DialogTitle>{"Move List"}</DialogTitle>
          <Button onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </Button>
        </div>
        <DialogActions className={classes.moveListBottom}>
          <FormControl>
            <InputLabel shrink>Position</InputLabel>
            <Select
              value={position}
              required
              onChange={(e) => setPosition(e.target.value)}
              displayEmpty
            >
              {positions.map((position, index) => (
                <MenuItem key={position} value={position}>
                  {index + 1}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.moveListButton}
              onClick={onSubmit}
            >
              Move List
            </Button>
          </FormControl>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

MoveList.propTypes = {
  listId: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default MoveList;
