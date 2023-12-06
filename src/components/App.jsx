import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "../components/Navigation/Navigation";
import { Home } from "../features/Home/Home";
import { Dashboard } from "../features/Dashboard/Dashboard";
import { LogIn } from "../features/LogIn/LogIn";
import { InventoryList } from "../features/InventoryList/InventoryList";
import { NotFound } from "../features/NotFound/NotFound";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="log-in" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
