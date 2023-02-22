import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  ImageList,
  ImageListItem,
  Select,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";
import axios from "../../api/axios";
import { getListProject } from "../../services/project/projectService";

let backgrounds = [
  "http://static1.squarespace.com/static/5fe4caeadae61a2f19719512/5fe5c3a9d85eb525301180ed/5ff082ae17af6f5d1930e6bf/1610530333403/Wallpaper+engine+4k.png?format=1500w",
  "https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/1609949775007-FKI50MYWWQG9KZHEA06W/35.jpg",
  "https://i.pinimg.com/originals/c5/40/01/c540018ca1c7b93cb1fbc218ea0c73a7.png",
  "https://c4.wallpaperflare.com/wallpaper/778/639/660/animals-firewatch-forest-minimalism-wallpaper-preview.jpg",
  "https://c4.wallpaperflare.com/wallpaper/228/1003/832/artistic-mountain-minimalist-moon-nature-hd-wallpaper-preview.jpg",
  "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export default function CreateBoard(props) {
  const { open, handleClose, updateBoard } = props;
  const [selectedPhoto, setSelectedPhoto] = useState(
    "https://c4.wallpaperflare.com/wallpaper/228/1003/832/artistic-mountain-minimalist-moon-nature-hd-wallpaper-preview.jpg"
  );
  const [projects, setProjects] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (open) {
      getListProject().then((res) => {
        setProjects(res.data);
      });
    }
  }, [open]);
  let initialValues = {
    backgroundURL: "",
    title: "",
    classify: "individual",
    project: params.id,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Không được để trống"),
      project: Yup.string().required("Không được để trống "),
    }),
    onSubmit: (values) => {
      formik.values.backgroundURL = selectedPhoto;
      axios
        .post("/boards", values)
        .then((res) => {
          updateBoard(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      handleClose();
      formik.resetForm();
    },
  });

  const close = () => {
    formik.resetForm();
    handleClose();
  };

  const [img, setImg] = useState(backgrounds);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className=" text-center">
          {"Tạo bảng"}
          <Button onClick={close} className=" float-right">
            <ClearIcon />
          </Button>
        </DialogTitle>
        <hr />
        <DialogContent>
          <form>
            <Box
              sx={{
                height: 600,
                width: 400,
                maxWidth: "100%",
              }}
            >
              <img
                src={`${selectedPhoto}`}
                loading="lazy"
                className="object-cover h-52 w-full"
                alt="background"
              />
              <br />
              <p>Ảnh nền</p>
              <ImageList
                sx={{ width: 420, height: 200 }}
                cols={3}
                rowHeight={100}
              >
                {img.map((item) => (
                  <ImageListItem key={item}>
                    <img
                      name="backgroundURL"
                      onClick={() => setSelectedPhoto(`${item}`)}
                      src={`${item}`}
                      srcSet={`${item}`}
                      alt={item}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <br />
              <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                <b>Tiêu đề bảng</b>
                <TextField
                  fullWidth
                  placeholder=""
                  name="title"
                  onChange={formik.handleChange}
                  error={formik.errors.title && formik.touched.title}
                  value={formik.values.title}
                  helperText={
                    formik.errors.title && formik.touched.title
                      ? formik.errors.title
                      : null
                  }
                />
              </FormControl>
              <br />
              <br />
              <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                <b>Phân loại</b>
                <Select
                  name="classify"
                  labelid="demo-simple-select-label"
                  id="classify"
                  value={formik.values.classify}
                  onChange={formik.handleChange}
                >
                  <MenuItem value="individual">Cá nhân</MenuItem>
                  <MenuItem value="group">Nhóm</MenuItem>
                </Select>
              </FormControl>
              <br />
              <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                <b>Không gian làm việc</b>
                <Select
                  name="project"
                  id="project"
                  labelid="demo-simple-select-label"
                  value={formik.values.project}
                  onChange={formik.handleChange}
                  error={formik.errors.project && formik.touched.project}
                >
                  {projects.map((project, index) => (
                    <MenuItem value={project._id} key={index}>
                      {project.name}
                    </MenuItem>
                  ))}
                </Select>
                <p style={{ color: "red" }}>
                  {formik.errors.project && formik.touched.project
                    ? formik.errors.project
                    : null}
                </p>
                <br />
              </FormControl>
              <Button
                style={{ width: 300, marginLeft: 50 }}
                type="submit"
                variant="contained"
                disableElevation
                onClick={formik.handleSubmit}
              >
                Tạo mới
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
