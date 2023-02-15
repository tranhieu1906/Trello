import {
  Avatar,
  Button,
  InputBase,
  ListItem,
  ListItemAvatar,
  Modal,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GithubPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { editCard } from "../../services/board/boardAction";
import SendIcon from "@mui/icons-material/Send";
import CardMembers from "./CardMembers";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ImageIcon from "@mui/icons-material/Image";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { sendComment } from "../../services/comment/commentActions";
import { getComment } from "../../services/comment/commentActions";

const CardModal = ({ cardId, open, setOpen, card, list }) => {
  const [title, setTitle] = useState(card.title);
  const { socket, userInfo } = useSelector((state) => state.auth);
  let [comment, setComment] = useState([]);
  let [value, setValue] = useState("");
  const [description, setDescription] = useState(card.description);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  useEffect(() => {
    getComment(card._id).then((data) => {
      console.log(data);
      setComment(data);
    });
  }, []);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard({ cardId, dataInput: { title, description } }));
  };

  const onArchiveCard = async () => {
    // dispatch(archiveCard(cardId, true));
    setOpen(false);
  };

  const handleSend = async () => {
    if (value !== "") {
      let commentNew = await sendComment(card._id, value);
      setComment([...comment, commentNew]);
    }
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
                dispatch(
                  editCard({
                    cardId,
                    dataInput: { title, description, label: color.hex },
                  })
                )
              }
            />
            <Button
              className="w-32 !mt-2"
              variant="outlined"
              onClick={async () =>
                dispatch(
                  editCard({
                    cardId,
                    dataInput: { title, description, label: "none" },
                  })
                )
              }
            >
              Không nhãn
            </Button>
          </div>
        </div>
        {/*<Checklist card={card} />*/}
        <div>
          <form>
            <FormatListBulletedIcon />
            <b style={{ marginLeft: 10 }}>Bình luận.</b>
            <div className="flex items-center mt-3">
              <Avatar
                src={userInfo.avatar}
                sx={{ width: 30, height: 30 }}
                className="mr-3"
              />
              <Paper
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 500,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="viết bình luận"
                  inputProps={{ "aria-label": "viết bình luận" }}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  onClick={handleSend}
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <SendIcon />
                </IconButton>
              </Paper>
            </div>
          </form>
          <List
            style={{ paddingTop: 0, paddingBottom: 4 }}
            sx={{
              width: 550,
              height: 64,
              maxWidth: 550,
              bgcolor: "background.paper",
              marginTop: 3,
              backgroundColor: "#CCFFFF",
            }}
          >
            {comment.map((comment) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    src={comment.user.avatar}
                    sx={{ width: 30, height: 30 }}
                    className="mr-3"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user.name}
                  secondary={comment.content}
                />
              </ListItem>
            ))}
          </List>
        </div>
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
