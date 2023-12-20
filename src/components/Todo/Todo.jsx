import React, { useState, useRef, useEffect, useContext } from "react";
import Header from "../Header/Header";
import "./Todo.css";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "../Theme/ThemeContext";
import { EditOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { Routes, Route, Link } from "react-router-dom";
import {
  EDIT_TODO_ITEM,
  SWAP_TODO_ITEM,
  DELETE_TODO_ITEM,
} from "../../redux/task";
function Todo(props) {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const [isEditing, setIsEditing] = useState(false);
  const { todo } = props;
  const updateRef = useRef();
  const [value, setValue] = useState(todo.content);
  const inputRef = useRef();
  const { theme } = useContext(ThemeContext);
  const HeaderWrapper = (props) => <Header ref={updateRef} {...props} />;
  const onDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };
  const onDrop = (e, id2) => {
    const id1 = e.dataTransfer.getData("text/plain");
    const todo1 = todoList.find((todo) => todo.id === id1);
    const todo2 = todoList.find((todo) => todo.id === id2);
    dispatch({ type: SWAP_TODO_ITEM, payload: { todo1, todo2 } });
  };
  const handleDoubleClick = () => setIsEditing(true);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      const editTodo = {
        id: todo.id,
        content: e.target.value,
        isCompleted: todo.isCompleted,
      };
      dispatch({ type: EDIT_TODO_ITEM, payload: editTodo });
    }
  };
  const changeIsCompleted = () => {
    debugger;
    const editTodo = {
      id: todo.id,
      content: todo.content,
      isCompleted: !todo.isCompleted,
    };
    dispatch({ type: EDIT_TODO_ITEM, payload: editTodo });
  };
  const editTodo = () => {
    // setTimeout(() => {
    //   updateRef.current.changeUpdate(todo.id, todo.content);
    // }, 1000);
  };
  return (
    <li className="todo-item">
      {isEditing ? (
        <div className="todo_input">
          <input
            onKeyDown={handleKeyDown}
            type="text"
            className="input"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            ref={inputRef}
          />
        </div>
      ) : (
        <div
          className="todo"
          draggable={true}
          onDragStart={(e) => onDragStart(e, todo.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, todo.id)}
          style={{ cursor: "move" }}
        >
          <div className="todo_check">
            <label className="checkbox_item" htmlFor={todo.id}>
              <input
                type="checkbox"
                id={todo.id}
                className="checkbox"
                checked={todo.isCompleted}
                onChange={changeIsCompleted}
              />
              <i className="fa-solid fa-check"></i>
            </label>
          </div>
          <div
            className={`div_content ${!todo.isCompleted ? theme : "content"}`}
            onDoubleClick={handleDoubleClick}
          >
            <p>{todo.content}</p>
            <div className="feature">
              <Routes>
                <Route path="/header" element={<HeaderWrapper />} />
              </Routes>

              <Link to="/header">
                <EditOutlined
                  onClick={editTodo}
                  style={{
                    fontSize: "24px",
                    padding: "6px 4px",
                    color: "blue",
                  }}
                />
              </Link>
              <DeleteOutlined
                onClick={() =>
                  dispatch({ type: DELETE_TODO_ITEM, payload: todo.id })
                }
                style={{ fontSize: "24px", padding: "6px 4px", color: "blue" }}
              />
              {/* <i
                className="fa-solid fa-pencil"
                onClick={() => requestUpdate(todo.id, todo.content)}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() =>
                  dispatch({ type: DELETE_TODO_ITEM, payload: todo.id })
                }
              ></i> */}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

export default Todo;
