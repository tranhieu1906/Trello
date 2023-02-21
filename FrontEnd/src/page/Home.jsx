import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import Divider from "@mui/material/Divider";
import { Avatar, ListItem, ListItemAvatar } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

import { getListProject } from "../services/project/projectService";

function Project() {
  const { loading, error } = useSelector((state) => state.board);
  const [open, setOpen] = useState(false);
  const [broads, setBroads] = useState([]);
  const [projects, setProjects] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getListProject().then((res) => {
      setProjects(res.data);
    });
  }, [projects]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <section
        className="flex flex-col items-center p-12"
        style={{ paddingTop: 20 }}
      >
        <div className="w-full">
          <ListItem
            style={{ paddingBottom: 25, paddingTop: 0, paddingLeft: 0 }}
          >
            <ListItemAvatar style={{ marginRight: 20 }}>
              <Avatar sx={{ width: 60, height: 60 }} variant="square">
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
          </ListItem>
        </div>
        <div className="w-full">
          <Divider varant="inset" />
        </div>
        <div className="w-full text-left">
          <PersonIcon style={{ width: 40, height: 40 }} />
          <b style={{ marginLeft: 15 }}>Các không gian của Bạn</b>
        </div>

        <div className="w-full text-left">
          {projects.map((project, index) => (
            <div key={index} style={{ fontSize: 30 }}>
              <Link to={`/w/${project._id}/home`}>{project.name}</Link>

              <hr />
            </div>
          ))}
        </div>

        {/*{loading && <CircularProgress className="m-10" />}*/}
        {/*<div className="m-2 items-center justify-center grid grid-cols-3 gap-4">*/}
        {/*  <Button*/}
        {/*    onClick={handleClickOpen}*/}
        {/*    style={{*/}
        {/*      backgroundColor: "darkgrey",*/}
        {/*      marginLeft: 20,*/}
        {/*      borderRadius: 13,*/}
        {/*      color: "white",*/}
        {/*    }}*/}
        {/*    className="w-60 h-24 m-5 no-underline font-medium text-white bg-cover"*/}
        {/*  >*/}
        {/*    Thêm*/}
        {/*  </Button>*/}
        {/*  {<CreateBoard open={open} handleClose={handleClose} />}*/}
        {/*</div>*/}
        <br />
        <div className="w-full text-left">
          <GroupIcon style={{ width: 40, height: 40 }} />
          <b style={{ marginLeft: 15 }}>Các không gian được mời</b>
        </div>
      </section>
    </div>
  );
}

export default Project;
