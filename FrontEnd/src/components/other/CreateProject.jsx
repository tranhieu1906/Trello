import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { createProject } from "../../services/project/projectService";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-toastify";

const categories = [
  "Nhân sự",
  "Doanh nghiệp nhỏ",
  "Kinh doanh CRM",
  "Marketing",
  "Điều hành",
  "Kỹ thuật-CNTT",
  "Giáo dục",
  "khác..",
];

export default function CreateProject({ updateProjects }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      permission: "private",
      category: "Nhân sự",
      describe: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Dự án không thể không có tên "),
    }),
    onSubmit: (values) => {
      createProject(values)
        .then((res) => {
          updateProjects(res.data);
          navigate(`/w/${res.data._id}/home`);
        })
        .catch((err) => {
          // toast()
          console.log(err.message);
        });
      handleClose();
    },
  });
  return (
    <div>
      <Button variant="outlined" className="!mt-4" onClick={handleClickOpen}>
        +
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form
          style={{
            paddingTop: 10,
            paddingLeft: 30,
            paddingRight: 35,
            paddingBottom: 30,
          }}
        >
          <div className="text-right">
            <Button onClick={handleClose}>
              <CloseIcon style={{ width: 40, height: 40, color: "blue" }} />
            </Button>
          </div>
          <DialogTitle>Hãy xây dựng một Không gian làm việc</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tăng năng suất của bạn bằng cách giúp mọi người dễ dàng truy cập
              bảng ở một vị trí.
            </DialogContentText>
            <FormControl fullWidth sx={{ m: 1, minWidth: 400 }} size="small">
              <b>Tên Không gian làm việc</b>
              <TextField
                fullWidth
                placeholder=""
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.errors.name && formik.touched.name}
                helperText={
                  formik.errors.name && formik.touched.name
                    ? formik.errors.name
                    : null
                }
              />
              <p>Đây là tên của công ty, nhóm hoặc tổ chức của bạn.</p>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 400 }} size="small">
              <b>Loại không gian làm việc</b>
              <Select
                name="category"
                labelid="demo-simple-select-label"
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 400 }} size="small">
              <b>Quyền</b>
              <Select
                value={formik.values.permission}
                onChange={formik.handleChange}
                name="permission"
                labelid="demo-simple-select-label"
                id="permission"
              >
                <MenuItem value="private">Riêng tư</MenuItem>
                <MenuItem value="public">Công khai</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, minWidth: 400 }} size="small">
              <b>Mô tả không gian làm việc</b>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                name="describe"
                placeholder="Nhóm của chúng tôi tổ chức mọi thứ ở đây."
                onChange={formik.handleChange}
                value={formik.values.describe}
              />
              <p>
                Đưa các thành viên của bạn vào bảng với mô tả ngắn về Không gian
                làm việc của bạn.
              </p>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ marginRight: 80, width: 300 }}
              type="submit"
              disableElevation
              variant="contained"
              onClick={formik.handleSubmit}
            >
              Tạo dự án
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
