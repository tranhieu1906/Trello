import { Button, Card, CardContent, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../../services/board/boardAction";

const CreateCardForm = ({ listId, setAdding }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setTitle("");
  };

  return (
    <form
      ref={formRef}
      className="mt-1 flex flex-col"
      onSubmit={(e) => onSubmit(e)}
    >
      <Card>
        <CardContent className="pt-0 pb-1">
          <TextField
            margin="normal"
            fullWidth
            multiline
            required
            label="Enter a title for this card"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
          />
        </CardContent>
      </Card>
      <div className="mb-1">
        <Button type="submit" variant="contained" color="primary">
          Add Card
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
  );
};

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
