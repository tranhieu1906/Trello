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
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { OutlinedInput } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

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

export default function Account() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Không được để trống"),
      newPassword: Yup.string()
        .required("Không được để trống")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/,
          "Tối thiểu 8 và tối đa 13 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
        ),
      confirmPassword: Yup.string()
        .required("Không được để trống!")
        .oneOf([Yup.ref("newPassword"), null], "Xác nhận mật khẩu không khớp"),
    }),
    onSubmit: (values, { resetForm }) => {
      axios
        .put("/users/password", values)
        .then((res) => {
          if (res.status === 200) {
            resetForm({});
            console.log(values);
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })

        .catch((error) => {
          console.log(error);
          resetForm({});
        });
    },
  });

  return (
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
            Đổi mật khẩu.
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
                  size="full"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Mật khẩu
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    autoComplete="on"
                    id="outlined-adornment-password"
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
                    label="PasswordChange"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <FormHelperText style={{ color: "#d32f2f" }}>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                {/*<FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">*/}
                {/*  <InputLabel htmlFor="outlined-adornment-password">*/}
                {/*    Mật khẩu cũ.*/}
                {/*  </InputLabel>*/}
                {/*  <OutlinedInput*/}
                {/*    id="outlined-adornment-password"*/}
                {/*    type={showPassword ? "text" : "password"}*/}
                {/*    endAdornment={*/}
                {/*      <InputAdornment position="end">*/}
                {/*        <IconButton*/}
                {/*          aria-label="toggle password visibility"*/}
                {/*          onClick={handleClickShowPassword}*/}
                {/*          onMouseDown={handleMouseDownPassword}*/}
                {/*          edge="end"*/}
                {/*        >*/}
                {/*          {showPassword ? <VisibilityOff /> : <Visibility />}*/}
                {/*        </IconButton>*/}
                {/*      </InputAdornment>*/}
                {/*    }*/}
                {/*    required*/}
                {/*    fullWidth*/}
                {/*    name="password"*/}
                {/*    label="Mật khẩu cũ"*/}
                {/*    autoComplete="password"*/}
                {/*    error={formik.errors.password && formik.touched.password}*/}
                {/*    helperText={*/}
                {/*      formik.errors.password && formik.touched.password*/}
                {/*        ? formik.errors.password*/}
                {/*        : null*/}
                {/*    }*/}
                {/*    value={formik.values.password}*/}
                {/*    onChange={formik.handleChange}*/}
                {/*    onBlur={formik.handleBlur}*/}
                {/*  />*/}
                {/*</FormControl>*/}
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Mật khẩu mới.
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
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
                    required
                    fullWidth
                    name="newPassword"
                    label="Mật khẩu mới "
                    autoComplete="newPassword"
                    error={
                      formik.errors.newPassword && formik.touched.newPassword
                    }
                    helperText={
                      formik.errors.newPassword && formik.touched.newPassword
                        ? formik.errors.newPassword
                        : null
                    }
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Nhập lại mật khẩu.
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
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
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Nhập lại mật khẩu "
                    autoComplete="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                    }
                    helperText={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                        ? formik.errors.confirmPassword
                        : null
                    }
                  />
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
  );
}
