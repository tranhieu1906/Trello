import { Box, CircularProgress } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getBoard, moveCard, moveList } from "../../actions/board";
import BoardDrawer from "../components/board/BoardDrawer";
import BoardTitle from "../components/board/BoardTitle";
import CreateList from "../components/board/CreateList";
// import Members from "../components/board/Members";
import List from "../components/list/List";
import Navbar from "../components/other/Navbar";

const Board = ({ match }) => {
  const board = useSelector((state) => state.board.board);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    // dispatch(getBoard(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + " | TrelloClone";
  }, [board?.title]);

  if (!isAuthenticated) {
    return navigate("/")
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === "card") {
      // dispatch(
      //   moveCard(draggableId, {
      //     fromId: source.droppableId,
      //     toId: destination.droppableId,
      //     toIndex: destination.index,
      //   })
      // );
    } else {
      // dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Fragment>
      <Navbar />
      <Box className="board-loading">
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
          <div className="board-top-left">
            <BoardTitle board={board} />
            {/* <Members /> */}
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
                {board.lists.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} />
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
