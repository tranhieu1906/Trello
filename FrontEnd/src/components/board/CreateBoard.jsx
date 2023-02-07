import * as React from 'react';
import {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import {Box, ImageList, ImageListItem, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "../../api/axios";

export default function CreateBoard(props) {
    const {open, handleClose} = props;
    const [selectedPhoto, setSelectedPhoto] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-6mBwHrZ-9WPC1V_DsRhDuQu0iDHmN50iUg&usqp=CAU")
    const [dataForm, setDataForm] = useState({
        backgroundURL: "",
        title: "",
        classify: "individual",
    });
    const [img, setImg] = useState([]);

    const handleChange = (event) => {
        setDataForm({
            ...dataForm,
            [event.target.name] : event.target.value
        })
    }

    const handleSubmit = () => {
        dataForm.backgroundURL = selectedPhoto;
        axios.post("/boards", dataForm).then((res) => {
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
        handleClose()
    }

    useEffect(() => {
        axios.get("/background").then((res) => {
            setImg(res.data )
        })
            .catch((err) => {
                console.log(err)
            })
    },[])
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
                    <Button onClick={handleClose} className=" float-right"><ClearIcon/></Button>
                </DialogTitle>
                <hr/>
                <DialogContent>
                    <form>
                    <Box
                        sx={{
                            height: 600,
                            width: 400,
                            maxWidth: '100%',
                        }}
                    >
                            <img
                                src={`${selectedPhoto}`}
                                loading="lazy"
                                className="object-cover h-52 w-full"
                            />
                            <b>background</b>
                            <ImageList sx={{ width: 420, height: 200 }} cols={3} rowHeight={100}>
                                {img.map((item) => (
                                    <ImageListItem key={item.img}>
                                        <img name="backgroundURL"
                                            onClick={() => setSelectedPhoto(`${item.img}`)}
                                            src={`${item.img}`}
                                            srcSet={`${item.img}`}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                            <br></br>
                            {/*<p><PriorityHighIcon style={{color: "red"}}/>Tiêu đề bảng là bắt buộc</p>*/}
                            <TextField fullWidth
                                       labelId="demo-simple-select-label"
                                       label="tiêu đề"
                                       onChange={handleChange}
                                       name="title"
                                       value={dataForm.title}/>
                            <br/>
                            <FormControl sx={{ m: 1, minWidth: 400 }} size="small">
                            <InputLabel id="demo-simple-select-label">Phân loại</InputLabel>
                            <Select
                                name="classify"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dataForm.classify}
                                label="classify"
                                onChange={handleChange}
                            >
                                <MenuItem value="individual">cá nhân</MenuItem>
                                <MenuItem value="group">nhóm</MenuItem>
                                <MenuItem value="public">công khai</MenuItem>
                            </Select>
                            </FormControl>
                            <br/>
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
                            <Button  onClick={handleSubmit} type="button" variant="contained" disableElevation >
                                tạo mới
                            </Button>
                    </Box>
                    </form>
                </DialogContent>
                <DialogActions >
                </DialogActions>
            </Dialog>
        </div>
    );
}