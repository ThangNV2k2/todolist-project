import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import Header from "../components/Header/Header";
const RootRouter = () => (
  <Router>
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/header/:id/:content" element={<Header />} />
      <Route path="/header" element={<Header />} />
    </Routes>
  </Router>
);

export default RootRouter;
