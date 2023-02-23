import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getBoards } from "../services/board/boardAction";
import { getUser } from "../services/user/userService";
import { Typography } from "@mui/material";
import { getListProject } from "../services/project/projectService";

function Home() {
  const { loading, error } = useSelector((state) => state.board);
  const { socket } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userToken")) dispatch(getBoards());
    getListProject().then((res) => {
      if (res.data[0]?._id) {
        navigate(`/w/${res.data[0]._id}/home`);
      }
    });
  }, []);

  useEffect(() => {
    document.title = "Your Boards | TrelloClone";

    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <Typography
        variant="h6"
        ml={1}
        mt={5}
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        KHÔNG GIAN LÀM VIỆC CỦA BẠN
      </Typography>
      <Typography variant="body1" ml={1} mt={3} component="div">
        Bạn chưa phải là thành viên của bất kỳ không gian làm việc nào.
        {/*<Link to="/" className="underline hover:text-red-600">*/}
        {/*  Tạo không gian làm việc*/}
        {/*</Link>*/}
      </Typography>
    </>
  );
}

export default Home;
