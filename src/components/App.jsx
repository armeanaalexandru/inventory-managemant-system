import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "../components/Navigation/Navigation";
import { Home } from "../features/Home/Home";
import { AboutUs } from "../features/AboutUs/AboutUs";
import { LogIn } from "../features/LogIn/LogIn";
import { InventoryList } from "../features/InventoryList/InventoryList";
import { NotFound } from "../features/NotFound/NotFound";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="inventar" element={<InventoryList />} />
        <Route path="despre-noi" element={<AboutUs />} />
        <Route path="log-in" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
