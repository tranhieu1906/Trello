import { Box, CircularProgress } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BoardDrawer from "../components/board/BoardDrawer";
import BoardTitle from "../components/board/BoardTitle";
import CreateList from "../components/board/CreateList";
import Members from "../components/board/Members";
import List from "../components/list/List";
import Navbar from "../components/other/Navbar";
import { getBoard, moveList, moveCard } from "../services/board/boardAction";
import { getUser } from "../services/user/userService";

const Board = () => {
  const { board, error } = useSelector((state) => state.board);
  const params = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(getUser());
    dispatch(getBoard(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + " | Trello";
  }, [board?.title]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (board) setData(board);
  }, [board, board?.lists]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId, type } = result;

    if (type === "list") {
      const lists = Array.from(data.lists);
      const [removed] = lists.splice(source.index, 1);
      lists.splice(destination.index, 0, removed);

      setData({
        ...data,
        lists,
      });
      dispatch(moveList({ listId: draggableId, toIndex: destination.index }));
    } else {
      const sourceList = data.lists.find(
        (list) => list._id === source.droppableId
      );
      const destList = data.lists.find(
        (list) => list._id === destination.droppableId
      );
      const card = sourceList.cards.find((card) => card._id === draggableId);

      if (sourceList === destList) {
        const cards = Array.from(sourceList.cards);
        cards.splice(source.index, 1);
        cards.splice(destination.index, 0, card);
        const lists = data.lists.map((list) => {
          if (list._id === sourceList._id) {
            return {
              ...list,
              cards,
            };
          }
          return list;
        });

        setData({
          ...data,
          lists: lists,
        });
        dispatch(
          moveCard({
            cardId: draggableId,
            formData: {
              fromId: source.droppableId,
              toId: destination.droppableId,
              toIndex: destination.index,
            },
          })
        );
      } else {
        const sourceCards = Array.from(sourceList.cards);
        sourceCards.splice(source.index, 1);

        const destCards = Array.from(destList.cards);
        destCards.splice(destination.index, 0, card);

        const lists = data.lists.map((list) => {
          if (list._id === sourceList._id) {
            return {
              ...list,
              cards: sourceCards,
            };
          } else if (list._id === destList._id) {
            return {
              ...list,
              cards: destCards,
            };
          }

          return list;
        });

        setData({
          ...data,
          lists,
        });
        dispatch(
          moveCard({
            cardId: draggableId,
            formData: {
              fromId: source.droppableId,
              toId: destination.droppableId,
              toIndex: destination.index,
            },
          })
        );
      }
    }
  };

  return !board ? (
    <Fragment>
      <Navbar />
      <Box className="text-center mt-5">
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div
      className="board-and-navbar"
      style={{
        backgroundImage:
          "url(" +
          (board.backgroundURL
            ? board.backgroundURL
            : "https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80") +
          ")",
      }}
    >
      <Navbar />
      <section className="board">
        <div className="board-top">
          <div className="board-top-left items-center">
            <BoardTitle board={board} />
            <Members />
          </div>
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data?.lists?.map((listId, index) => (
                  <List
                    key={listId._id}
                    listId={listId._id}
                    index={index}
                    list={listId}
                  />
                ))}
                {provided.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};

export default Board;
