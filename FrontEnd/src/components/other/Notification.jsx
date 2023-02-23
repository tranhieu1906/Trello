import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { BellIcon } from "@heroicons/react/24/outline";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
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
import { readNotification } from "../../services/notification/notificationService";
import { getNotification } from "../../services/notification/notificationService";
import moment from "moment";
moment.locale("vi");

export default function Notification() {
  const { socket } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newNotification, setNewNotification] = useState(0);
  const [checked, setChecked] = React.useState(true);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    getNotification()
      .then((res) => {
        setNotification(res.data.notification.new);
        setNewNotification(res.data.notification.new.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    socket?.on("new-notifications", (data) => {
      getNotification()
        .then((res) => {
          setNotification(res.data.notification.new);
          setNewNotification(res.data.notification.new.length);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const handleReadNotification = () => {
    readNotification().then((res) => {
      let data = res.data.notification.new;
      setNotification(data);
      setNewNotification(res.data.notification.new.length);
    });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (!checked) {
      getNotification()
        .then((res) => {
          setNotification(res.data.notification.new);
          setNewNotification(res.data.notification.new.length);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getNotification()
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
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  className="flex items-center"
                >
                  <p className="text-sm">chỉ hiển thị chưa đọc</p>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </Typography>
                {checked && notification.length > 0 ? (
                  <Button
                    style={{ paddingLeft: 100 }}
                    onClick={handleReadNotification}
                    color="secondary"
                  >
                    đọc tất cả
                  </Button>
                ) : (
                  <span />
                )}
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
                {notification.map((item) => (
                  <div
                    className="border border-gray-900 rounded"
                    style={{ marginBottom: 15 }}
                    key={item._id}
                  >
                    <Typography
                      component="div"
                      gutterBottom
                      variant="body1"
                      style={{ height: 30, paddingTop: 2 }}
                    >
                      <ListItem style={{ padding: 0 }}>
                        <ListItemText
                          style={{ paddingLeft: 10 }}
                          primary={item.attachBoard.title}
                        />
                      </ListItem>
                    </Typography>
                    <ListItem
                      style={
                        item.new
                          ? { backgroundColor: "rgb(209 213 219)" }
                          : { backgroundColor: "#ffffff" }
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={item.sender.name}
                          src={item.sender.avatar}
                          sx={{ width: 30, height: 30 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.sender.name}
                        // secondary={`${i.content} ${i.attachBoard.title}`}
                      />
                    </ListItem>
                    <Typography
                      gutterBottom
                      variant="body1"
                      style={
                        item.new
                          ? {
                              backgroundColor: "rgb(209 213 219)",
                              marginBottom: 0,
                              padding: 15,
                              paddingLeft: 40,
                            }
                          : {
                              backgroundColor: "#ffffff",
                              marginBottom: 0,
                              padding: 15,
                              paddingLeft: 40,
                            }
                      }
                    >
                      {`${item.content} ${item.attachBoard.title}`}
                      <br />
                      {moment(item.createdAt).fromNow()}
                    </Typography>
                  </div>
                ))}
              </List>
            ) : (
              <div>
                <div className="flex items-center justify-center ">
                  <img
                    src={`https://a.trellocdn.com/prgb/assets/ee2660df9335718b1a80.svg`}
                    srcSet={`https://a.trellocdn.com/prgb/assets/ee2660df9335718b1a80.svg`}
                    loading="lazy"
                  />
                </div>
                <div className="text-center">
                  <h3>không có thông báo mới</h3>
                </div>
              </div>
            )}
          </Box>
          {/*<Box sx={{ mt: 3, ml: 1, mb: 1 }}></Box>*/}
        </Box>
      </Menu>
    </div>
  );
}
