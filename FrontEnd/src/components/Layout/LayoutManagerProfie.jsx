import * as React from "react";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navbar from "../other/Navbar";
import SidebarManagerProfile from "../other/SidebarManagerProfile";
import { useEffect } from "react";
import { getUser } from "../../services/user/userService";
import { useDispatch } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function LayoutManagerProfie() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={2}>
          <SidebarManagerProfile />
        </Grid>
        <Grid item xs={10}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
