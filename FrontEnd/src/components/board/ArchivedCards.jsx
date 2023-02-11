import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { archiveCard, deleteCard } from "../../actions/board";

import { Card, List, ListItem, CardContent, Button } from "@mui/material";

const ArchivedCards = () => {
  const { cards, lists } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const onDelete = async (listId, cardId) => {
    // dispatch(deleteCard(listId, cardId));
  };

  const onSendBack = async (cardId) => {
    // dispatch(archiveCard(cardId, false));
  };

  return (
    <div>
      <List>
        {cards
          .filter((card) => card.archived)
          .map((card, index) => (
            <ListItem key={index} className="flex flex-row">
              <Card>
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
                  Gửi đến danh sách
                </Button>
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedCards;
