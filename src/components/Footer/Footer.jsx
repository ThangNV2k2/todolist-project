import React, { useState, useEffect, useContext } from "react";
import { options } from "../../App";
import "./Footer.css";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_TODO_ITEM } from "../../redux/task";
import { ThemeContext } from "../Theme/ThemeContext";
import { Button } from "antd";

function Footer(props) {
  const { theme } = useContext(ThemeContext);
  const todoList = useSelector((state) => state.todoList);
  const [cntTodo, setCntTodo] = useState(0);
  const { myOption, setMyOption } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    let cnt = 0;
    todoList.forEach((todo) => {
      if (!todo.isCompleted) {
        cnt++;
      }
    });
    setCntTodo(cnt);
  }, [todoList]);
  const deleteAllCompleted = () => {
    todoList.forEach((todo) => {
      if (todo.isCompleted) {
        dispatch({ type: DELETE_TODO_ITEM, payload: todo.id });
      }
    });
  };
  return (
    <div className={`Footer ${theme}`}>
      {todoList.length > 0 && (
        <div className="Footer--left">
          <p>{cntTodo} items left</p>
          <div className="btns">
            <Button
              className={`btn ${myOption === options.All ? "act" : ""}`}
              onClick={() => setMyOption(options.All)}
            >
              All
            </Button>
            <Button
              className={`btn ${myOption === options.Active ? "act" : ""}`}
              onClick={() => setMyOption(options.Active)}
            >
              Active
            </Button>
            <Button
              className={`btn ${myOption === options.Completed ? "act" : ""}`}
              onClick={() => setMyOption(options.Completed)}
            >
              Completed
            </Button>
          </div>
        </div>
      )}
      <div className="Footer--right">
        {todoList.length - cntTodo > 0 && (
          <Button
            type="ghost"
            className="clearBtn"
            onClick={deleteAllCompleted}
          >
            Clear completed
          </Button>
        )}
      </div>
    </div>
  );
}

export default Footer;
