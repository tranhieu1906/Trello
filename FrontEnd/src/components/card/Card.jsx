import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../../services/board/boardAction";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SubjectIcon from "@mui/icons-material/Subject";
import { Avatar, Button, CardContent, TextField, Tooltip } from "@mui/material";
import CardMUI from "@mui/material/Card";
import CardModal from "./CardModal";
const getInitials = (name) => {
  let initials = name.match(/\b\w/g) || [];
  return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
};
const Card = ({ cardId, list, index }) => {
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState(0);
  const [completeItems, setCompleteItems] = useState(0);
  const cardRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCard(cardId));
  }, [cardId, dispatch]);
  const listBoard = useSelector((state) => state.board.board.lists);
  const card = listBoard.reduce(
    (result, object) =>
      result || object.cards.find((element) => element._id === cardId),
    undefined
  );
  useEffect(() => {
    if (card) {
      setTitle(card.title);
      card.checklist &&
        setCompleteItems(
          card.checklist.reduce(
            (completed, item) => (completed += item.complete ? 1 : 0),
            0
          )
        );
    }
  }, [card]);

  useEffect(() => {
    cardRef && cardRef.current && setHeight(cardRef.current.clientHeight);
  }, [list, card, cardRef]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    // dispatch(editCard(cardId, { title }));
    setEditing(false);
    setMouseOver(false);
  };

  return !card || (card && card.archived) ? (
    ""
  ) : (
    <Fragment>
      <CardModal
        cardId={cardId}
        open={openModal}
        setOpen={setOpenModal}
        card={card}
        list={list}
      />
      {!editing ? (
        <Draggable draggableId={cardId} index={index}>
          {(provided) => (
            <CardMUI
              className={`card ${mouseOver && !editing ? "mouse-over" : ""}`}
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {mouseOver && !editing && (
                <Button
                  style={{
                    position: "absolute",
                    bottom: height - 40,
                    left: "180px",
                    zIndex: 1,
                  }}
                  onClick={() => setEditing(true)}
                >
                  <EditIcon fontSize="small" />
                </Button>
              )}
              <CardContent
                onClick={() => {
                  setOpenModal(true);
                  setMouseOver(false);
                }}
                ref={cardRef}
              >
                {card.label && card.label !== "none" && (
                  <div
                    className="card-label"
                    style={{ backgroundColor: card.label }}
                  />
                )}
                <p>{card.title}</p>
                <div className="card-bottom">
                  <div className="card-bottom-left">
                    {card.description && (
                      <SubjectIcon
                        className="description-indicator"
                        fontSize="small"
                      />
                    )}
                    {card.checklist && card.checklist.length > 0 && (
                      <div
                        className={`checklist-indicator ${
                          completeItems === card.checklist.length
                            ? "completed-checklist-indicator"
                            : ""
                        }`}
                      >
                        <AssignmentTurnedInIcon
                          fontSize="small"
                          className="checklist-indicator-icon"
                        />
                        {completeItems}/{card.checklist.length}
                      </div>
                    )}
                  </div>
                  <div className="card-member-avatars">
                    {card.members.map((member) => {
                      return (
                        <Tooltip title={member.user.name} key={member.user._id}>
                          <Avatar className="avatar">
                            {getInitials(member.user.name)}
                          </Avatar>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </CardMUI>
          )}
        </Draggable>
      ) : (
        <form className="create-card-form" onSubmit={(e) => onSubmitEdit(e)}>
          <CardMUI>
            <CardContent className="card-edit-content">
              <TextField
                margin="normal"
                fullWidth
                multiline
                required
                label="Chỉnh sửa tiêu đề của thẻ này"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSubmitEdit(e)}
              />
            </CardContent>
          </CardMUI>
          <div className=" mt-1">
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setMouseOver(false);
                setTitle(card.title);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
