import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import HomeButton from "./pages/HomeButton";
import Categories from "./pages/Categories";
import Recommend from "./pages/Recommend";
import RecommendDetail from "./pages/RecommendDetail";
function App() {
  return (
    <Router>
      <HomeButton />
      <Routes>
        <Route path="/" element={<Home />} />/
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/recommend/:category" element={<RecommendDetail />} />
      </Routes>
    </Router>
  );
}
//
export default App;
