import { Card, Select } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AvatarEdit from "react-avatar-edit";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";
import storage from "../../fireBase/config";
import { setAvatar } from "../../redux/features/auth/authSlice";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ManagerProfile() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [userLogin, setUserLogin] = useState(userInfo);
  const [open, setOpen] = useState(false);
  const [imageCrop, setImageCrop] = useState(userInfo?.avatar);

  const onCrop = (view) => {
    setImageCrop(view);
  };

  const onCLose = () => {
    setImageCrop(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataForm = useFormik({
    initialValues: {
      name: userLogin?.name || "",
      email: userLogin?.email || "",
      address: userLogin?.address || "",
      phone: userLogin?.phone || "",
      gender: userLogin?.gender || "Nam",
    },
    onSubmit: (values) => {
      axios
        .put("/users/update-profile", values)
        .then((res) => {
          setUserLogin(res.data);
          toast.success(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  useEffect(() => {
    axios.get("/users").then((res) => {
      setUserLogin(res.data);
      dataForm.setValues(res.data);
    });
  }, []);
  const getInitials = (name) => {
    let initials = name?.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
  };

  const saveImage = () => {
    if (!userInfo.avatar) {
      const storageRef = ref(
        storage,
        `/user-upload/${userInfo._id.toString()}`
      );
      uploadString(storageRef, imageCrop, "data_url")
        .then(async (snapshot) => {
          let image = await getDownloadURL(storageRef);
          await axios.post("/users/update", image.toString());
          dispatch(setAvatar(image));
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const desertRef = ref(storage, userInfo.avatar);
      deleteObject(desertRef)
        .then(() => {
          const storageRef = ref(
            storage,
            `/user-upload/${userInfo._id.toString()}`
          );
          uploadString(storageRef, imageCrop, "data_url").then(
            async (snapshot) => {
              let image = await getDownloadURL(storageRef);
              await axios.post("/users/update", image.toString());
              dispatch(setAvatar(image));
              handleClose();
            }
          );
        })
        .catch((error) => {
          console.log("Error!!!");
        });
    }
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Cập nhật thông tin tài khoản
      </Typography>
      {userLogin && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap={2}
          component="form"
          noValidate
          onSubmit={dataForm.handleSubmit}
        >
          <Box gridColumn="span 12">
            <Card sx={{ padding: 10 + "px" }}>
              <Typography variant="h6" gutterBottom>
                Thông tin tài khoản
              </Typography>
              <div className="flex items-center justify-center mb-4">
                {userInfo?.avatar ? (
                  <Avatar
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                    alt="Avatar"
                    src={userInfo?.avatar}
                    onClick={handleClickOpen}
                  />
                ) : (
                  <Avatar
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                    alt="Avatar"
                    onClick={handleClickOpen}
                  >
                    {getInitials(userInfo.name)}
                  </Avatar>
                )}

                <Dialog
                  onClose={handleClose}
                  open={open}
                  maxWidth="sm"
                  fullWidth
                >
                  <DialogTitle>Cập Nhật ảnh đại diện</DialogTitle>
                  <AvatarEdit
                    width="100%"
                    height={300}
                    onClose={onCLose}
                    onCrop={onCrop}
                  />
                  <Button type="button" onClick={saveImage}>
                    Lưu
                  </Button>
                </Dialog>
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Họ và tên"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
                    value={dataForm.values.name}
                    onChange={dataForm.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                    disabled
                    value={dataForm.values.email}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Địa chỉ"
                    fullWidth
                    autoComplete="address"
                    variant="outlined"
                    value={dataForm.values.address}
                    onChange={dataForm.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                    required
                    id="phone"
                    type="number"
                    name="phone"
                    label="SĐT"
                    fullWidth
                    autoComplete="phone"
                    variant="outlined"
                    value={dataForm.values.phone}
                    onChange={dataForm.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-select-label">Giới tính</InputLabel>
                    <Select
                      labelId="gender-select-label"
                      id="gender"
                      name="gender"
                      label="Giới tính"
                      value={dataForm.values.gender}
                      onChange={dataForm.handleChange}
                    >
                      <MenuItem value="Khác">Khác</MenuItem>
                      <MenuItem value="Nam">Nam</MenuItem>
                      <MenuItem value="Nữ">Nữ</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button variant="contained" type="submit">
                    Lưu
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
}
