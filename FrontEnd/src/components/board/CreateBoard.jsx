import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import { useFormik } from "formik";
import {
  Box,
  ImageList,
  ImageListItem,
  Select,
  TextField,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { getBoardData } from "../../services/board/boardAction";
import * as Yup from "yup";
import { userLogin } from "../../services/auth/authActions";

let backgrounds = [
  "http://static1.squarespace.com/static/5fe4caeadae61a2f19719512/5fe5c3a9d85eb525301180ed/5ff082ae17af6f5d1930e6bf/1610530333403/Wallpaper+engine+4k.png?format=1500w",
  "https://images.squarespace-cdn.com/content/v1/5fe4caeadae61a2f19719512/1609949775007-FKI50MYWWQG9KZHEA06W/35.jpg",
  "https://i.pinimg.com/originals/c5/40/01/c540018ca1c7b93cb1fbc218ea0c73a7.png",
  "https://c4.wallpaperflare.com/wallpaper/778/639/660/animals-firewatch-forest-minimalism-wallpaper-preview.jpg",
  "https://c4.wallpaperflare.com/wallpaper/228/1003/832/artistic-mountain-minimalist-moon-nature-hd-wallpaper-preview.jpg",
];

export default function CreateBoard(props) {
  const { open, handleClose, updateBoard } = props;
  const [selectedPhoto, setSelectedPhoto] = useState(
    "https://c4.wallpaperflare.com/wallpaper/228/1003/832/artistic-mountain-minimalist-moon-nature-hd-wallpaper-preview.jpg"
  );

  const formik = useFormik({
    initialValues: {
      backgroundURL: "",
      title: "",
      classify: "individual",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      formik.values.backgroundURL = selectedPhoto;
      axios
        .post("/boards", values)
        .then(async () => {
          let data = await getBoardData();
          updateBoard(data);
        })
        .catch((error) => {
          console.log(error);
        });
      handleClose();
      formik.resetForm();
    },
  });

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
          <Button onClick={handleClose} className=" float-right">
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
              />
              <b>background</b>
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
              <br></br>
              <TextField
                fullWidth
                labelId="demo-simple-select-label"
                label="tiêu đề"
                onChange={formik.handleChange}
                name="title"
                error={!!formik.errors.title && formik.touched.title}
                value={formik.values.title}
                helperText={
                  formik.errors.title && formik.touched.title
                    ? formik.errors.title
                    : null
                }
              />
              <br />
              <br />
              <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                <InputLabel id="demo-simple-select-label">Phân loại</InputLabel>
                <Select
                  name="classify"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.classify}
                  label="classify"
                  onChange={formik.handleChange}
                >
                  <MenuItem value="individual">cá nhân</MenuItem>
                  <MenuItem value="group">nhóm</MenuItem>
                  <MenuItem value="public">công khai</MenuItem>
                </Select>
              </FormControl>
              <br />
              {/*<FormControl sx={{ m: 1, minWidth: 400 }} size="small">*/}
              {/*    <InputLabel id="demo-simple-select-label">Nơi làm việc</InputLabel>*/}
              {/*    <Select*/}
              {/*        name="space"*/}
              {/*        labelId="demo-simple-select-label"*/}
              {/*        id="demo-simple-select"*/}
              {/*        defaultValue={'default'}*/}
              {/*        // value={age}*/}
              {/*        label="Working space"*/}
              {/*        // onChange={handleChange}*/}
              {/*    >*/}
              {/*        <MenuItem value={"default"}>default</MenuItem>*/}
              {/*    </Select>*/}
              {/*</FormControl>*/}
              <Button
                type="submit"
                variant="contained"
                disableElevation
                onClick={formik.handleSubmit}
              >
                tạo mới
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
