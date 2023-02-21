import React, { useEffect, useState } from "react";

import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import { addUser } from "../../services/project/projectService";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 23px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

export default function HandleInput({ project, members }) {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { error, board } = useSelector((state) => state.board);
  const { socket, userInfo } = useSelector((state) => state.auth);
  const searchOptions = users.filter((user) =>
    members.find((member) => member.user === user._id) ? false : true
  );
  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue && newInputValue !== "") {
      const search = (await axios.get(`/users/${newInputValue}`)).data.slice(
        0,
        5
      );
      setUsers(search && search.length > 0 ? search : []);
    }
  };

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: searchOptions,
    getOptionLabel: (option) => option.email,
  });

  useEffect(() => {
    setInputValue("");
  }, [value]);
  const onSubmit = async () => {
    let id = [];
    let userExists = [];
    value.forEach((i) => {
      let check = members[0].some((member) => member.user === i._id);
      if (check) {
        userExists.push(i);
      } else {
        id.push(i._id);
      }
    });
    if (userExists.length > 0) {
      let message = "";
      userExists.forEach((user) => (message += `${user.email}, `));
      toast.error(`Người dùng : ${message} đã có sẵn trong Nhóm!`);
    } else {
      // await notificationAddMember(id, board, userInfo);
      await addUser(id, project)
        .then((res) => {
          toast.success("mời nguời dùng vào nhóm thành công");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <>
      <Root>
        <div {...getRootProps()}>
          <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
            {value.map((option, index) => (
              <StyledTag label={option.email} {...getTagProps({ index })} />
            ))}
            <input
              {...getInputProps()}
              value={inputValue}
              placeholder="Địa chỉ email"
              onChange={(e) => handleInputValue(e.target.value)}
            />
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>
                <span>{option.email}</span>
                <CheckIcon fontSize="small" />
              </li>
            ))}
          </Listbox>
        ) : null}
      </Root>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        onClick={onSubmit}
      >
        Chia sẻ
      </button>
    </>
  );
}
