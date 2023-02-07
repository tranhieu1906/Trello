import { Box, CircularProgress } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getBoard, moveCard, moveList } from "../services/board/boardAction";
import BoardDrawer from "../components/board/BoardDrawer";
import BoardTitle from "../components/board/BoardTitle";
import CreateList from "../components/board/CreateList";
import Members from "../components/board/Members";
import List from "../components/list/List";
import Navbar from "../components/other/Navbar";

const Board = () => {
  const { board } = useSelector((state) => state.board);
  const params = useParams();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBoard(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + " | Trello";
  }, [board?.title]);

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
      <Box className="text-center mt-5">
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div
      className="bg-cover h-screen"
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
      <section className="p-3">
        <div className="p-1 flex flex-wrap flex-row justify-between pb-8">
          <div className="flex flex-wrap flex-row">
            <BoardTitle board={board} />
            <Members />
          </div>
          <BoardDrawer />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="flex flex-row overflow-x-auto"
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
