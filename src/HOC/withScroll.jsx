import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export const withScroll = (WrappedComponent) => {
  let isGetting = false;
  const ref = React.createRef();
  return (props) => {
    const todoList = useSelector((state) => state.todoList);
    const { numberTodoInit = 4, endScrollPosition = 10 } = props;
    const [numberTodo, setNumberTodo] = useState(numberTodoInit);
    const [loadingState, setLoadingState] = useState(false);
    useEffect(() => {
      const handleScroll = () => {
        if (
          ref.current.scrollTop + ref.current.clientHeight >=
            ref.current.scrollHeight - endScrollPosition &&
          !isGetting
        ) {
          isGetting = true;
          if (numberTodo >= todoList.length) {
            isGetting = false;
            return;
          }
          setLoadingState(true);
          setTimeout(() => {
            isGetting = false;
            setNumberTodo(numberTodo + numberTodoInit);
            setLoadingState(false);
          }, 1000);
        }
      };
      ref.current.addEventListener("scroll", handleScroll);
      return () => {
        if (ref.current)
          ref.current.removeEventListener("scroll", handleScroll);
      };
    }, [numberTodo, todoList, endScrollPosition, numberTodoInit]);

    return (
      <WrappedComponent
        ref={ref}
        numberTodo={numberTodo}
        loadingState={loadingState}
        {...props}
      />
    );
  };
};
