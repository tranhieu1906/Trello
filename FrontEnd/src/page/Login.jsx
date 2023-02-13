import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { userLogin } from "../services/auth/authActions";
import Auth from "../components/Auth/auth";
import logo from "../assests/trello-logo-blue.svg";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, userToken, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Không được để trống"),
      password: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      dispatch(userLogin(values));
    },
  });
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (userToken && !loading) {
      navigate("/");
      toast.success("Đăng nhập thành công");
    }
  }, [error, userToken, navigate, loading]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Auth>
        <div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">
          <img src={logo} alt="logo" className="mx-auto mb-2 h-10 w-52" />
          <p className="mx-auto text-slate-400 font-bold text-lg max-w-xs text-center	">
            Đăng nhập .
          </p>
          {/*<div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">*/}
          {/*  <LazyLoadImage*/}
          {/*    draggable="false"*/}
          {/*    className="mx-auto h-30 w-36 object-contain"*/}
          {/*    src={logo}*/}
          {/*    alt="logo"*/}
          {/*  />*/}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={!!formik.errors.email && formik.touched.email}
              helperText={
                formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null
              }
              required
              size="small"
            />
            <FormControl
              error={!!formik.errors.password && formik.touched.password}
              fullWidth
              required
              size="small"
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
                label="Password"
              />
              {formik.errors.password && formik.touched.password ? (
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {formik.errors.password}
                </FormHelperText>
              ) : null}
            </FormControl>
            <button
              type="submit"
              className="bg-primary-blue font-medium py-2 rounded text-white w-full"
            >
              Đăng Nhập
            </button>
            <div className="flex">
              <span className="my-3 text-gray-500"></span>
            </div>
            <Link
              to="/password/forgot"
              className="text-sm font-medium  text-blue-800"
            >
              Quên mật khẩu?
            </Link>
          </form>
        </div>

        <div className="bg-white border p-5 text-center drop-shadow-md">
          <span>
            Bạn chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary-blue">
              Đăng Ký
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
}

export default Login;
