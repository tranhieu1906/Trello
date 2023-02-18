import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Menu from "@mui/material/Menu";

import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormDialogAddUsergit from "../projects/addUser";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

function KeyboardArrowDownIcon() {
  return null;
}

function FormatListNumberedIcon() {
  return null;
}

function PersonAddIcon() {
  return null;
}

function PeopleAltIcon() {
  return null;
}

function MoreHorizIcon() {
  return null;
}

export default function MenuItemProject() {
  const [projects, setProjects] = useState([
    {
      name: " DỰ ÁN C0822H11",
    },
  ]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {projects.map((project, index) => (
        <div>
          <MenuItem
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {project.name} <MoreVertRoundedIcon />
          </MenuItem>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} disableRipple>
              <FormatListNumberedIcon />
              Bảng
            </MenuItem>
            <MenuItem onClick={handleClose} disableRipple>
              <PeopleAltIcon />
              Thành viên
            </MenuItem>

            <MenuItem disableRipple>
              <PersonAddIcon />
              Thêm thành viên
              <FormDialogAddUsergit />
            </MenuItem>
            <MenuItem disableRipple>
              <MoreHorizIcon />
              More
            </MenuItem>
          </StyledMenu>
        </div>
      ))}
    </div>
  );
}
