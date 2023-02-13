import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addCardMember } from "../../services/board/boardAction";
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

const CardMembers = ({ card }) => {
  const boardMembers = useSelector((state) => state.board.board.members);
  const members = card.members.map((member) => {
    return member.user._id
  })
  const dispatch = useDispatch();

  return (
    <div>
      <h3 className="mt-5 ml-3">Members</h3>
      <FormControl component="fieldset">
        <FormGroup>
          {boardMembers.map((member) => (
            <FormControlLabel
              key={member.user._id}
              control={
                <Checkbox
                  checked={members.indexOf(member.user._id) !== -1}
                  onChange={async (e) =>
                    dispatch(
                      addCardMember({
                        add: e.target.checked,
                        cardId: card._id,
                        userId: e.target.name,
                      })
                    )
                  }
                  name={member.user._id}
                />
              }
              label={member.user.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;
