import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../Theme/ThemeContext";
import { useContext } from "react";
import { ADD_TODO, EDIT_TODO_ITEM } from "../../redux/task";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
const Header = () => {
  const inputRef = useRef();
  const idUpdate = useRef(null);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const { theme } = useContext(ThemeContext);
  let { id: idParam, content: contentParam } = useParams();
  const navigate = useNavigate();
  const eventSubmit = (e) => {
    if (e.code === "Enter") {
      if (value.trim() !== "") {
        const todo = {
          id: uuid(),
          content: value.trim(),
          isCompleted: false,
        };
        dispatch({ type: ADD_TODO, payload: todo });
        setValue("");
      }
      navigate("/");
    }
  };
  // useImperativeHandle(ref, () => ({
  //   changeUpdate(id, content) {
  //     idUpdate.current = id;
  //     setValue(content);
  //     inputRef.current.focus();
  //   },
  // }));
  const eventUpdate = (e) => {
    if (e.code === "Enter") {
      if (value.trim() !== "") {
        const editTodo = {
          id: idUpdate.current,
          content: value.trim(),
          isCompleted: todoList.find((todo) => todo.id === idUpdate.current)
            .isCompleted,
        };
        dispatch({ type: EDIT_TODO_ITEM, payload: editTodo });
        setValue("");
        idUpdate.current = null;
        navigate("/");
        // idParam = null;
        // contentParam = null;
        // history.push("/");
      }
    }
  };
  useEffect(() => {
    if (idParam && contentParam) {
      idUpdate.current = idParam;
      setValue(decodeURIComponent(contentParam));
      inputRef.current.focus();
    } else {
      inputRef.current.focus();
    }
  }, [idParam, contentParam]);
  return (
    <div className={`header ${theme}`}>
      <input
        type="text"
        placeholder={!idUpdate.current ? "What needs to be done?" : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={!idUpdate.current ? eventSubmit : eventUpdate}
        ref={inputRef}
      />
    </div>
  );
};

export default Header;
