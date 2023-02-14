import { Button, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GithubPicker } from "react-color";
import { useDispatch } from "react-redux";
import { editCard } from "../../services/board/boardAction";
// import Checklist from "../checklist/Checklist";
import CardMembers from "./CardMembers";
// import DeleteCard from "./DeleteCard";

const CardModal = ({ cardId, open, setOpen, card, list }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard({ cardId, data: { title, description } }));
  };

  const onArchiveCard = async () => {
    // dispatch(archiveCard(cardId, true));
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div
        style={{ width: "800px", top: "10%" }}
        className={`flex flex-col absolute left-1/2 translate-x-2/4 overflow-auto bg-white rounded-sm pt-1 pb-2 p-1.5 `}
      >
        <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
          <div className="">
            <Button onClick={() => setOpen(false)} style={{ float: "right" }}>
              <CloseIcon />
            </Button>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              multiline
              label="Tiêu đề thẻ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && onTitleDescriptionSubmit(e)
              }
              className="w-full"
            />
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            label="Mô tả thẻ"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={
              title === card.title &&
              (description === card.description ||
                (description === "" && !card.description))
            }
            className="w-44 mt-0.5"
          >
            Lưu
          </Button>
        </form>
        <div className="flex justify-between flex-wrap h-auto">
          <CardMembers card={card} />
          <div>
            <h3 className="mt-5 ml-2">Nhãn</h3>
            <GithubPicker
              className="min-w-picker"
              onChange={async (color) =>
                dispatch(editCard({ cardId, data: { label: color.hex } }))
              }
            />
            <Button
              className="w-32 !mt-2"
              variant="outlined"
              onClick={async () =>
                dispatch(editCard({ cardId, data: { label: "none" } }))
              }
            >
              Không nhãn
            </Button>
          </div>
        </div>
        {/* <Checklist card={card} /> */}
        <div className="flex justify-between flex-wrap h-auto">
          <div className="flex flex-col justify-end mt-5">
            <Button
              variant="contained"
              className="mb-1"
              onClick={onArchiveCard}
            >
              lưu trữ
            </Button>
            {/* <DeleteCard cardId={cardId} setOpen={setOpen} list={list} /> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

export default CardModal;
