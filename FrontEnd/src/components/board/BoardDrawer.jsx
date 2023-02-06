import React, { useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

import ArchiveIcon from "@mui/icons-material/Archive";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArchivedCards from "./ArchivedCards";
import ArchivedLists from "./ArchivedLists";

const BoardDrawer = () => {
  const [open, setOpen] = useState(false);
  const [viewingArchivedLists, setViewingArchivedLists] = useState(false);
  const [viewingArchivedCards, setViewingArchivedCards] = useState(false);
  const [activityChunks, setActivityChunks] = useState(1);
  const {activity} = useSelector((state) => state.board.board);
  const handleClose = () => {
    setOpen(false);
    setActivityChunks(1);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        className={open ? "hidden" : "flex justify-between w-40"}
      >
        <MoreHorizIcon fontSize="small" /> Show Menu
      </Button>
      <Drawer
        className={open ? "w-80 shrink-0" : "hidden"}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: "jss108",
        }}
      >
        {!viewingArchivedLists && !viewingArchivedCards ? (
          <div>
            <div className="flex items-center justify-between">
              <h3>Menu</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <List>
              <ListItem button onClick={() => setViewingArchivedLists(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={"Archived Lists"} />
              </ListItem>
              <ListItem button onClick={() => setViewingArchivedCards(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={"Archived Cards"} />
              </ListItem>
            </List>
            <Divider />
            <div className="text-center">
              <h3>Activity</h3>
            </div>
            <List>
              {activity.slice(0, activityChunks * 10).map((activity) => (
                <ListItem key={activity._id}>
                  <ListItemText
                    primary={activity.text}
                    secondary={<Moment fromNow>{activity.date}</Moment>}
                  />
                </ListItem>
              ))}
            </List>
            <div className="text-center">
              <Button
                disabled={activityChunks * 10 > activity.length}
                onClick={() => setActivityChunks(activityChunks + 1)}
              >
                View More Activity
              </Button>
            </div>
          </div>
        ) : viewingArchivedLists ? (
          <div>
            <div className="flex items-center justify-between">
              <Button onClick={() => setViewingArchivedLists(false)}>
                <ChevronLeftIcon />
              </Button>
              <h3>Archived Lists</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <ArchivedLists />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <Button onClick={() => setViewingArchivedCards(false)}>
                <ChevronLeftIcon />
              </Button>
              <h3>Archived Cards</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <ArchivedCards />
          </div>
        )}
        <Divider />
      </Drawer>
    </div>
  );
};

export default BoardDrawer;
