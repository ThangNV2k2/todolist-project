import React, { useContext, useState } from "react";
// import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import Footer from "./components/Footer/Footer";
import Theme from "./components/Theme/Theme";
import { ThemeContext } from "./components/Theme/ThemeContext";
import { Button } from "antd";
import "./App.css";
import { Link } from "react-router-dom";
export const options = {
  All: "All",
  Active: "Active",
  Completed: "Completed",
};

function App() {
  const { theme } = useContext(ThemeContext);
  // const headerRef = useRef();
  const [myOption, setMyOption] = useState(options.All);
  // const requestUpdate = (id, content) =>
  //   headerRef.current.changeUpdate(id, content);
  return (
    <div className={`container ${theme}`}>
      <Theme />
      <h1>todos</h1>
      <div className="main">
        <Link to="/header">
          <Button type="primary" style={{ margin: "16px 0px 5px 20px" }}>
            Add Todo
          </Button>
        </Link>
        {/* <Header ref={headerRef} /> */}
        <TodoList myOption={myOption} />
        <Footer setMyOption={setMyOption} myOption={myOption} />
      </div>
    </div>
  );
}

export default App;
