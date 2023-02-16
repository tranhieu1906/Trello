import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { PhotoCamera } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { getUser, getUserLogin } from "../../services/user/userService";
import { useFormik } from "formik";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ManagerProfile() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [userLogin, setUserLogin] = useState(userInfo);

  const dataForm = useFormik({
    initialValues: {
      name: userLogin?.name || "",
      email: userLogin?.email || "",
      address: userLogin?.address || "",
      phone: userLogin?.phone || "",
      dateOfBirth: userLogin?.dateOfBirth || "",
      gender: userLogin?.gender || "Nam",
    },
    onSubmit: (values) => {
      axios
        .put("/users/update-profile", values)
        .then((res) => {
          console.log(res);
          setUserLogin(res.data);
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
          <Box gridColumn="span 6">
            <Card sx={{ padding: 10 + "px" }}>
              <Typography variant="h6" gutterBottom>
                Thông tin tài khoản
              </Typography>
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
                <Grid item xs={12} sm={5}>
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
                <Grid item xs={12} sm={5}>
                  <TextField
                    sx={{
                      width: 500,
                      maxWidth: "100%",
                    }}
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Năm sinh"
                    type="date"
                    variant="outlined"
                    value={dataForm.values.dateOfBirth}
                    onChange={dataForm.handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
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
          <Box gridColumn="span 4">
            <Card sx={{ maxHeight: 500 }}>
              <Avatar
                style={{ marginTop: 10, marginLeft: 180, marginBottom: 10 }}
                alt="Remy Sharp"
                // src={userInfo.avatar}
                sx={{ width: 150, height: 150 }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {userInfo?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ảnh hồ sơ và ảnh tiêu đề
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </>
  );
}
