import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { archiveList } from "../../actions/board";

import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const ArchivedLists = () => {
  const listObjects = useSelector((state) => state.board.board.listObjects);
  const dispatch = useDispatch();

  const onSubmit = async (listId) => {
    // dispatch(archiveList(listId, false));
  };

  return (
    <div>
      <List>
        {listObjects
          .filter((list) => list.archived)
          .map((list, index) => (
            <ListItem key={index}>
              <ListItemText primary={list.title} />
              <Button onClick={() => onSubmit(list._id)}>Send to Board</Button>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedLists;
