import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { archiveCard } from "../../services/board/boardAction";

import { Card, List, ListItem, CardContent, Button } from "@mui/material";

const ArchivedCards = () => {
  const { lists } = useSelector((state) => state.board.board);
  const dispatch = useDispatch();
  const onDelete = async (listId, cardId) => {
    // dispatch(deleteCard(listId, cardId));
  };

  const onSendBack = async (cardId) => {
    dispatch(archiveCard({ cardId, archive: false }));
  };

  return (
    <div>
      <List>
        {lists.map((list) =>
          list.cards
            .filter((card) => card.archived)
            .map((card, index) => (
              <ListItem key={index} className="flex flex-col">
                <Card className="w-full">
                  <CardContent>{card.title}</CardContent>
                </Card>
                <div>
                  <Button
                    color="secondary"
                    onClick={() =>
                      onDelete(
                        lists.find((list) => list.cards.includes(card._id))._id,
                        card._id
                      )
                    }
                  >
                    Xóa thẻ
                  </Button>
                  <Button onClick={() => onSendBack(card._id)}>
                    Trả về danh sách
                  </Button>
                </div>
              </ListItem>
            ))
        )}
      </List>
    </div>
  );
};

export default ArchivedCards;
