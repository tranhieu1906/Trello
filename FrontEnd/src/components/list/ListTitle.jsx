import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { renameList } from "../../services/board/boardAction";

const ListTitle = ({ list }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if(title !== list.title){
      dispatch(renameList({ listId: list._id, title }));
    }
    setEditing(false);
  };

  return !editing ? (
    <h3 className="list-title" onClick={() => setEditing(true)}>
      {list.title}
    </h3>
  ) : (
    <form onSubmit={(e) => onSubmit(e)} onBlur={(e) => onSubmit(e)}>
      <TextField
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

ListTitle.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListTitle;
