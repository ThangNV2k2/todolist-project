import React, { useContext, useEffect, useState } from "react";
import Todo from "../Todo/Todo";
import { options } from "../../App";
import "./TodoList.css";
import { withScroll } from "../../HOC/withScroll";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "../Theme/ThemeContext";
import { FETCH_TASK } from "../../redux/task";
// import { set } from "immutable";
const TodoList = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const [loadingData, setLoadingData] = useState(false);
  const { myOption } = props;
  const { theme } = useContext(ThemeContext);
  const { numberTodo, loadingState, requestUpdate } = props;

  const displayTodoList = () => {
    const todoListDisplay = [];
    for (let i = 0; i < Math.min(numberTodo, todoList.length); i++) {
      if (
        todoList[i] &&
        todoList[i].id &&
        (myOption === options.All ||
          (myOption === options.Active && !todoList[i].isCompleted) ||
          (myOption === options.Completed && todoList[i].isCompleted))
      ) {
        todoListDisplay.push(
          <Todo
            key={todoList[i].id}
            todo={todoList[i]}
            requestUpdate={requestUpdate}
          />
        );
      }
    }
    return todoListDisplay;
  };
  useEffect(() => {
    const loadingTodo = (fetchTodoList) => {
      setLoadingData(true);
      setTimeout(() => {
        fetchTodoList();
      }, 0);
    };
    const fetchData = () => {
      dispatch({ type: FETCH_TASK });
      setLoadingData(false);
    };
    loadingTodo(fetchData);
  }, [dispatch]);
  return (
    <div className={`${theme}`}>
      {loadingData ? <p className="loading">Loading todo...</p> : ""}
      <ul
        className="todo-list"
        ref={ref}
        style={{ maxHeight: "200px", overflowY: "scroll" }}
      >
        {displayTodoList()}
      </ul>
      {loadingState ? <p className="loading">Loading more todo...</p> : ""}
    </div>
  );
});

export default withScroll(TodoList);
