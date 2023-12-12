import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "../components/Navigation/Navigation";
import { Home } from "../features/Home/Home";
import { AboutUs } from "../features/AboutUs/AboutUs";
import { Authentication } from "../features/Authentication/Authentication";
import { InventoryList } from "../features/InventoryList/InventoryList";
import { NotFound } from "../features/NotFound/NotFound";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="authentication" element={<Authentication />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
