import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { registerUser } from "../services/auth/authActions";
import Auth from "../components/Auth/auth";
import logo from "../assests/trello-logo-blue.svg";

function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, userInfo, error } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được để trống"),
      email: Yup.string()
        .required("Không được để trống")
        .email("Vui lòng nhập đúng định dạng Email"),
      password: Yup.string()
        .required("Không được để trống")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,13}$/,
          "Tối thiểu 8 và tối đa 13 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
        ),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
      navigate("/login");
      toast.success("Đăng ký tài khoản thành công");
    },
  });
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (userInfo) {
      navigate("/");
    }
  }, [dispatch, error, navigate, userInfo]);

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
            Đăng ký tài khoản.
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={!!formik.errors.email && formik.touched.email}
              helperText={
                formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null
              }
            />
            <TextField
              fullWidth
              label="Họ và tên"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={!!formik.errors.name && formik.touched.name}
              helperText={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : null
              }
              size="small"
            />

            <FormControl
              error={!!formik.errors.password && formik.touched.password}
              fullWidth
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
              <PasswordStrengthBar
                password={formik.values.password}
                minLength={8}
                minScore={3}
                scoreWords={["Yếu", "Yếu", "Trung bình", "Tốt", "Mạnh"]}
                shortScoreWord={""}
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
              Đăng ký
            </button>
            <span className="my-3 text-gray-500"></span>
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
            Bạn đã có tài khoản?{" "}
            <Link to="/login" className="text-primary-blue">
              Đăng nhập
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
}

export default SignUp;
