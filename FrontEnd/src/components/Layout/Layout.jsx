import * as React from "react";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Navbar from "../other/Navbar";
import Sidebar from "../other/Sidebar";
import { useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  
  color: theme.palette.text.secondary,
  height: theme.spacing(98)
}));

export default function Layout() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9}>
          <Item className="h-full">
            <Outlet />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
