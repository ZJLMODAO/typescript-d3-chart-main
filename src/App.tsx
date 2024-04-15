import Layout from "./pages/Layout";
import Home from "./pages/home/Home";
import NoPage from "./pages/NoPage";
import GridPage from "./pages/gridPage/GridPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="GridPage" element={<GridPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
