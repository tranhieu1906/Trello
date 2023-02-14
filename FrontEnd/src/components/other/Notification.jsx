import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { BellIcon } from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";

import axios from "../../api/axios";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Badge,
  ListItem,
  ListItemAvatar,
  Switch,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import Moment from "react-moment";

export default function Notification() {
  const { socket } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newNotification, setNewNotification] = useState(0);
  const [checked, setChecked] = React.useState(true);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    axios
      .get("/notification/get")
      .then((res) => {
        setNotification(res.data.notification.new);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    socket.on("new-notifications", (data) => {
      axios
        .get("/notification/get")
        .then((res) => {
          let data = res.data.notification.all;
          setNotification(data);
        })
        .catch((err) => {
          console.log(err);
        });
      setNewNotification(newNotification + 1);
    });
  }, [socket]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      axios
        .get("/notification/get")
        .then((res) => {
          setNotification(res.data.notification.new);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("/notification/get")
        .then((res) => {
          setNotification(res.data.notification.all);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={newNotification} color="error">
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </Badge>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box
          sx={{
            width: 450,
            maxWidth: 600,
            height: 650,
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h4" component="div">
                  Thông báo
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h6" component="div">
                  <p className="text-sm">chỉ hiển thị chưa đọc</p>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary" variant="body2">
              {/*strings*/}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 2 }}>
            {notification.length > 0 ? (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 450,
                  bgcolor: "background.paper",
                }}
              >
                {notification.map((i) => (
                  <div
                    className="border border-gray-900"
                    style={{ marginBottom: 15 }}
                    key={i._id}
                  >
                    <Typography
                      gutterBottom
                      variant="body1"
                      style={{ height: 30, paddingTop: 2 }}
                    >
                      <ListItem style={{ padding: 0 }}>
                        <img
                          style={{ height: 30, width: 50 }}
                          src={`${i.attachBoard.backgroundURL}`}
                          srcSet={`${i.attachBoard.backgroundURL}`}
                          alt={i.attachBoard.title}
                          loading="lazy"
                        />
                        <ListItemText
                          style={{ paddingLeft: 10 }}
                          primary={i.attachBoard.title}
                        />
                      </ListItem>
                    </Typography>
                    <ListItem
                      style={
                        i.new
                          ? { backgroundColor: "#CCFFFF" }
                          : { backgroundColor: "#dadbe5" }
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={i.sender.name}
                          src={i.sender.avatar}
                          sx={{ width: 30, height: 30 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={i.sender.name}
                        // secondary={`${i.content} ${i.attachBoard.title}`}
                      />
                    </ListItem>
                    <Typography
                      gutterBottom
                      variant="body1"
                      style={
                        i.new
                          ? {
                              backgroundColor: "#CCFFFF",
                              marginBottom: 0,
                              padding: 15,
                              paddingLeft: 40,
                            }
                          : {
                              backgroundColor: "#dadbe5",
                              marginBottom: 0,
                              padding: 15,
                              paddingLeft: 40,
                            }
                      }
                    >
                      {`${i.content} ${i.attachBoard.title}`}
                      <br />
                      {<Moment fromNow>{i.createdAt}</Moment>}
                    </Typography>
                  </div>
                ))}
              </List>
            ) : (
              <>
                <div className="flex items-center justify-center ">
                  <img
                    src={`https://a.trellocdn.com/prgb/assets/ee2660df9335718b1a80.svg`}
                    srcSet={`https://a.trellocdn.com/prgb/assets/ee2660df9335718b1a80.svg`}
                    loading="lazy"
                  />
                  <div className="text-center">
                    <h3>không có thông báo</h3>
                  </div>
                </div>
              </>
            )}
          </Box>
          {/*<Box sx={{ mt: 3, ml: 1, mb: 1 }}></Box>*/}
        </Box>
      </Menu>
    </div>
  );
}
