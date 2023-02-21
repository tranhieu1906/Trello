import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "../../services/board/boardAction";
import Card from "../card/Card";
import CreateCardForm from "./CreateCardForm";
import ListMenu from "./ListMenu";
import ListTitle from "./ListTitle";

const List = ({ listId, index, list }) => {
  const [addingCard, setAddingCard] = useState(false);
  const { loading } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return (
    <>
      {loading && <LinearProgress color="primary" variant="soft" />}
      {!list || (list && list.archived) ? (
        ""
      ) : (
        <Draggable draggableId={listId} index={index}>
          {(provided) => (
            <div
              className="list-wrapper"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className="list-top">
                <ListTitle list={list} />
                <ListMenu listId={listId} />
              </div>
              <Droppable droppableId={listId} type="card">
                {(provided) => (
                  <div
                    className={`list ${
                      addingCard ? "adding-card" : "not-adding-card"
                    }`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="cards">
                      {list.cards.map((cardId, index) => (
                        <Card
                          key={cardId._id}
                          cardId={cardId._id}
                          list={list}
                          index={index}
                        />
                      ))}
                    </div>
                    {provided.placeholder}
                    {addingCard && (
                      <div ref={createCardFormRef}>
                        <CreateCardForm
                          listId={listId}
                          setAdding={setAddingCard}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
              {!addingCard && (
                <div className="create-card-button">
                  <Button
                    variant="contained"
                    onClick={() => setAddingCard(true)}
                  >
                    + Thêm
                  </Button>
                </div>
              )}
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
