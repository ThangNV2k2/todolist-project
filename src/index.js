import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "./components/Theme/ThemeContext";
import RootRouter from "./routers/rootRouter";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RootRouter>
          <App />
        </RootRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
