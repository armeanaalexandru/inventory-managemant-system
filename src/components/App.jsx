import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "../components/Navigation/Navigation";
import { Home } from "../features/Home/Home";
import { Authentication } from "../features/Authentication/Authentication";
import { InventoryList } from "../features/InventoryList/InventoryList";
import { NotFound } from "../features/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "../features/Authentication/AuthContext";

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";
import { RequireAuth } from "../features/Authentication/RequireAuth";

export default function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <MainNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="inventory"
            element={
              <RequireAuth>
                <InventoryList />
              </RequireAuth>
            }
          />
          <Route path="register" element={<Authentication />} />
          <Route path="login" element={<Authentication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="bottom-center" />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
