import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { renameBoard } from "../../actions/board";

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    // dispatch(renameBoard(board._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h2
      className="cursor-pointer text-snow-900 max-w-lg overflow-hidden whitespace-nowrap"
      style={{ color: "white" }}
      onClick={() => setEditing(true)}
    >
      {board.title}
    </h2>
  ) : (
    <form className="bg-white" onSubmit={(e) => onSubmit(e)}>
      <TextField
        variant="outlined"
        required
        value={title}
        size="small"
        id="standard-basic"
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

BoardTitle.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardTitle;
