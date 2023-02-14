// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import {useFormik} from "formik";
// import * as Yup from "yup";
// import {toast} from "react-toastify";
// import FormHelperText from "@mui/material/FormHelperText";
//
// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }
//
// const theme = createTheme();
//
// export default function PasswordChange() {
//     const formik = useFormik({
//         initialValues: {
//             password: "",
//             newPassword: "",
//             confirmPassword: "",
//         },
//         validationSchema: Yup.object({
//             password: Yup.string().required("Không được để trống"),
//             newPassword: Yup.string()
//                 .required("Không được để trống")
//                 .matches(
//                     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/,
//                     "Tối thiểu 8 và tối đa 13 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
//                 ),
//
//             confirmPassword: Yup.string()
//                 .required("Không được để trống!")
//                 .oneOf([Yup.ref("newPassword"), null], "Mật khẩu không khớp"),
//         }),
//         onSubmit: (value, { resetForm }) => {
//             axios
//                 .put("/users/password", value)
//                 .then((res) => {
//                     if (res.status === 200) {
//                         toast.success(res.data.message);
//                         // navigate("/manager-profile");
//                     } else {
//                         toast.error(res.data.message);
//                     }
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//             resetForm();
//         },
//     });
//
//
//
//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign up
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={formik.handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="password"
//                   label="Mật khẩu cũ"
//                   name="password"
//                   autoComplete="password"
//                   type="password"
//                   value ={formik.values.password}
//                   onChange={formik.handleChange}
//                   error={!!formik.errors.password && formik.touched.password}
//                   {formik.errors.password && formik.touched.password ? (
//                       <FormHelperText style={{ color: "#d32f2f" }}>
//                           {formik.errors.password}
//                       </FormHelperText>
//                   ) : null}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="newPassword"
//                   label="Mật khẩu mới "
//                   name="newPassword"
//                   autoComplete="new-Password"
//                   type="password"
//                   value ={formik.values.newPassword}
//                   onChange={formik.handleChange}
//                   error={!!formik.errors.newPassword && formik.touched.newPassword}
//                   {formik.errors.newPassword && formik.touched.newPassword ? (
//                       <FormHelperText style={{ color: "#d32f2f" }}>
//                           {formik.errors.newPassword}
//                       </FormHelperText>
//                   ) : null}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="confirmPassword"
//                   label="Nhập lại mật khẩu "
//                   id="confirmPassword"
//                   autoComplete="confirm-password"
//                   type="password"
//                   value ={formik.values.confirmPassword}
//                   onChange={formik.handleChange}
//                   error={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
//                   {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
//                       <FormHelperText style={{ color: "#d32f2f" }}>
//                           {formik.errors.confirmPassword}
//                       </FormHelperText>
//                   ) : null}
//                 />
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//         <Copyright sx={{ mt: 5 }} />
//       </Container>
//     </ThemeProvider>
//   );
// }
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function validatePassword(value) {
  let error;
  if (!value) {
    error = "Bắt buộc";
  } else if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/.test(
      value
    )
  ) {
    error = "Invalid email address";
  }
  return error;
}

export default function PasswordChange() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Không được để trống"),
      newPassword: Yup.string()
        .required("Không được để trống")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/,
          "Tối thiểu 8 và tối đa 13 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
        ),

      confirmPassword: Yup.string()
        .required("Không được để trống!")
        .oneOf([Yup.ref('newPassword')],"Mật khẩu không khớp")
    }),
    onSubmit: (values, { resetForm }) => {
      // axios
      //   .put("/users/password", values)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       toast.success(res.data.message);
      //       // navigate("/manager-profile");
      //     } else {
      //       toast.error(res.data.message);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      console.log(values)
      resetForm();
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đổi mật khẩu
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl
                    error={!!formik.errors.password && formik.touched.password}
                    fullWidth
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Mật khẩu cũ
                    </InputLabel>
                    <OutlinedInput
                      name="password"
                      autoComplete="on"
                      id="oldPassword"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Mật khẩu cũ"
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <FormHelperText style={{ color: "#d32f2f" }}>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    error={!!formik.errors.newPassword && formik.touched.newPassword}
                    fullWidth
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Mật khẩu mới
                    </InputLabel>
                    <OutlinedInput
                      name="newPassword"
                      autoComplete="on"
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Mật khẩu mới "
                    />
                    {formik.errors.newPassword && formik.touched.newPassword ? (
                      <FormHelperText style={{ color: "#d32f2f" }}>
                        {formik.errors.newPassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    error={
                      !!formik.errors.confirmPassword && formik.touched.confirmPassword
                    }
                    fullWidth
                    required
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Nhập lại mật khẩu
                    </InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      autoComplete="on"
                      id="confirmPassword"
                      type={showNewPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Nhập lại mật khẩu "
                    />
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword ? (
                      <FormHelperText style={{ color: "#d32f2f" }}>
                        {formik.errors.confirmPassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
