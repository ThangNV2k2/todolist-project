import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Header from "../components/Header/Header";
const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
  {
    path: "/header",
    element: <Header />,
  },
]);

export default router;
