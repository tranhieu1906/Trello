import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../services/board/boardAction";
import CloseIcon from "@mui/icons-material/Close";
import { Button, TextField } from "@mui/material";

const CreateList = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addList({ title }));
    setTitle("");
  };

  return !adding ? (
    <div className="mt-3" style={{ minWidth: "200px" }}>
      <Button variant="contained" onClick={() => setAdding(true)}>
        + Thêm danh sách khác
      </Button>
    </div>
  ) : (
    <div
      ref={formRef}
      style={{ minWidth: "280px", padding: "0 10px 10px" }}
      className="mt-3 h-fit bg-white rounded flex flex-col"
    >
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant="outlined"
          fullWidth
          margin="normal"
          required
          label="Enter list title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <Button type="submit" variant="contained" color="primary">
            Add List
          </Button>
          <Button
            onClick={() => {
              setAdding(false);
              setTitle("");
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateList;
